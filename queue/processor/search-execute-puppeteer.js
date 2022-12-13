const SearchModel = require('../../models/model.search');
const SearchResultModel = require('../../models/model.searchResult');
const SegmentModel = require('../../models/model.segment');
const LocationModel = require('../../models/model.location');
const openai = require('../../services/openai');

// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const { createCursor } = require("ghost-cursor");

async function getResultConfidence(segment, result){
    const prompt = `How confident are you that this google search result represents a ${segment}?: "${result}"?\n\nRespond with nothing except a numeric confidence score from 0 to 100.`;
    console.log(prompt);
    return await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 0.5,
        max_tokens: 4,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
}

async function scrapeGoogle(segment, location) {
    try{

        const searchTerm = segment.queryPattern.replace('%location%', `${location.city}, ${location.state}`);

        // Launch a headless puppeteer browser
        const browser = await puppeteer.launch(
            {
                headless: false,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox'
                ]
            }
        );

        // Create a new page
        const page = await browser.newPage();
        // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36');
        await page.setViewport({ width: 1280, height: 800 });

        // Navigate to the Google search page and enter the search term
        await page.goto('https://www.google.com/search?q=' + searchTerm);

        // Extract the search results
        const results = await scrapePage(page, segment);

        // Close the browser
        await browser.close();

        // Return the search results
        return results;
    } catch(e){
        return e;
    }
}

async function scrapePage(page, segment){
    const confidenceThreshold = 25;
    let results = [];
    let avgConfidence = 100;
    let previousPageHeight = 0;

    const cursor = createCursor(page)

    try{
        while(avgConfidence > confidenceThreshold){

            // Save the scrollHeight of the page
            previousPageHeight = await page.evaluate('document.body.scrollHeight');

            // Wait for the search results to load
            await page.waitForSelector('div.g');

            // Collect all the results we haven't been collected yet
            const newResults = (
                await page.evaluate((results) => {
                    console.log('results exists', results);
                    return [
                        ...Array
                            .from(document.querySelectorAll('div.g'))
                            .map(element => {
                                const title = element.querySelector('h3') ? element.querySelector('h3').textContent : null;
                                const url = element.querySelector('a') ? element.querySelector('a').getAttribute('href') : null;
                                const textContent = element.innerText.split("\n").join(" ").trim();
                                const html = element.innerHTML;
                                return { title, url, textContent, html };
                            }),
                        ...Array
                            .from(document.querySelectorAll('[data-text-ad]'))
                            .map(element => {
                                const title = element.querySelector('[role=heading]') ? element.querySelector('[role=heading]').textContent : null;
                                const url = element.querySelector('a') ? element.querySelector('a').getAttribute('href') : null;
                                const textContent = element.innerText.split("\n").join(" ").trim();
                                const html = element.innerHTML;
                                return { title, url, textContent, html };
                            })
                    ].filter(newResult => {
                        const isNew = results.find(existingResult => existingResult.url === newResult.url) ? false : true;
                        return newResult.url && isNew;
                    })
                }, results)
            )

            console.log(`${newResults.length} new results found.`);
            console.log(`Checking result confidence for ${newResults.length} results from this page.`);

            // Get confidence scores for all the new results
            for(const i in newResults){
                try{
                    const confidenceResult = await getResultConfidence(
                        segment.confidenceQuery,
                        newResults[i].textContent
                    );
                    if(confidenceResult && confidenceResult.data && confidenceResult.data.choices){
                        console.log('Confidence for result', newResults[i].title, 'is', confidenceResult.data.choices[0].text.trim());
                        newResults[i].confidence = parseInt(confidenceResult.data.choices[0].text)
                        if(isNaN(newResults[i].confidence)){
                            newResults[i].confidence = 50;
                        }
                    }else{
                        if(confidenceResult.data.error){
                            console.log('Error getting confidence for result', newResults[i].title, confidenceResult.data.error);
                        }
                        newResults[i].confidence = 50;
                    }

                }catch(e){
                    console.log('error getting confidence for result', newResults[i].title);
                    newResults[i].confidence = 50;
                }
            }

            // Add the new results to the total results array
            results = results.concat(newResults);

            // Calculate the average confidence score
            avgConfidence = Math.round(newResults.reduce((a, b) => a + b.confidence, 0) / newResults.length);

            console.log(`Average confidence for ${newResults.map(r => r.confidence).join(',')} results on this page is ${avgConfidence}.`);

            // If the confidence is still high, scroll down the page and load more results.
            if(avgConfidence > confidenceThreshold){
                console.log(`Attempting to load next page...`);
                // click the "show more results" button

                const hasNextPageButton = await page.evaluate(() => {
                    return document.querySelector('#pnnext') ? true : false;
                })

                const moreResultsButton = await page.evaluateHandle(() => Array.from(document.querySelectorAll('a h3')).find(a => a.innerText.toLowerCase().includes('more results')))

                // find googles "more results" button and click it
                console.log({
                    hasNextPageButton,
                    moreResultsButton
                });

                if(moreResultsButton && moreResultsButton.click){
                    console.log(`"More Results" button found. Clicking it.`, moreResultsButton);
                    await Promise.all([
                        page.waitForNavigation(),
                        cursor.click('a h3:contains("More results")')
                    ]);
                }else if(hasNextPageButton){
                    console.log(`Found next page button. Clicking it.`);
                    await Promise.all([
                        page.waitForNavigation(),
                        cursor.click('#pnnext')
                    ]);
                }else{
                    console.log(`No buttons found. Attempting infinite scroll.`);
                    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
                    await page.waitForFunction(`document.body.scrollHeight > ${previousPageHeight}`);
                }
                await page.waitForTimeout(10000);
            }else{
                console.log(`Confidence threshold reached. Returning ${results.length} results.`);
            }
        }
        return results;
    } catch(e){
        console.log(e);
        return results;
    }
}


module.exports = async function(job, done){
    try {
        console.log('Checking Search job queue');
        const search = await SearchModel.findOne({status: 'queued'});
        if(search){
            console.log('Found search job. Executing.');
            search.status = 'processing';
            await search.save();
            const segment = await SegmentModel.findById(search.segment);
            const location = await LocationModel.findById(search.location);
            const results = (
                    await scrapeGoogle(segment, location)
                )
                .map(result => Object.assign(result, {
                    location: search.location,
                    search: search._id,
                    segment: search.segment
                }))
                .filter(result => result.url);

            console.log(`Search yielded ${results.length} results.`);

            if(results){
                console.log(`Saving search results.`);
                const jobResults = {
                    created: 0,
                    updated: 0
                }
                for(const i in results){
                    const existingSearchResult = await SearchResultModel.findOne({
                        url: results[i].url
                    });
                    if(existingSearchResult){
                        if(existingSearchResult.confidence < results[i].confidence){
                            console.log('Found existing search result with smaller confidence. Updating it.');
                            existingSearchResult.confidence = results[i].confidence;
                            existingSearchResult.segment = results[i].segment;
                            await existingSearchResult.save();
                            jobResults.updated++;
                        }else{
                            // Confidence is lower than the existing result. Don't update it.
                        }
                    }else{
                        await new SearchResultModel(results[i]).save();
                        jobResults.created++;
                    }
                }
                console.log(`Saving search results.`);
                search.status = 'complete';
                search.results = results.length;
                await search.save();
                console.log(`Search job marked complete: Created ${jobResults.created}, Updated ${jobResults.updated}.`);
                done();
            }else{
                search.status = 'error';
                await search.save();
                done(results);
            }
        }else{
            console.log('Search job queue empty.');
        }
        done();
    } catch(e) {
        console.log('Error executing search', e);
        done(e)
    }
}