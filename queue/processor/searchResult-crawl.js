const SearchResultModel = require('../../models/model.searchResult');
const sharp = require('sharp');
const puppeteer = require('../../services/puppeteer');
sharp.cache(false);

async function resizeFile(path) {
    let buffer = await sharp(path)
        .resize(2000, 2000, {
            fit: sharp.fit.inside,
            withoutEnlargement: true,
        })
        .toBuffer();
    return sharp(buffer).toFile(path);
}
module.exports = async function(job, done){
    // get the job data
    const { searchResultId } = job.attrs.data;
    const searchResult = await SearchResultModel.findById(searchResultId);
    if(searchResult){
        searchResult.status = 'processing';
        await searchResult.save();
        console.log('Crawling:', searchResult.url);

        try{

            // Create a new page
            const page = await puppeteer.getPage();
            // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36');
            await page.setViewport({ width: 1280, height: 800 });

            // Navigate to the Google search page and enter the search term
            console.log('Loading new page');
            await page.goto(searchResult.url, {waitUntil: 'networkidle0'});
            console.log('Page loaded. Gathering data and taking screen shot.');

            // get the page content
            searchResult.html = await page.content();
            searchResult.text = await page.evaluate(() => document.body.innerText);
            searchResult.status = 'crawled';
            await searchResult.save();

            // take a screenshot of the page in the searchResults folder with the filenameof the search result ID.
            await page.screenshot({
                path: `public/searchResults/${searchResult._id}.webp`,
                fullPage: true
            });

            // scale the screenshot down to be 500 pixels wide
            await sharp(`public/searchResults/${searchResult._id}.webp`)
            await resizeFile(`public/searchResults/${searchResult._id}.webp`);

            let linkCount = 0;
            // If this is a root search result let's search for any other links that look relevant.
            if(!searchResult.searchResult){
                // search the page for up to 3 links to pages from the same domain
                // that reference contact or about pages
                const contactLinks = await page.evaluate(() => Array
                    .from(document.querySelectorAll('a'))
                    .filter(link => {
                        return `${link.href} ${link.innerText}`.match(/contact|about|reach|email|call/gi) &&
                            link.href.match(new RegExp(window.location.hostname, 'gi'))
                    })
                    .map(link => link.href.split('?')[0])
                    .slice(0,3)
                );
                for(let i = 0; i < contactLinks.length; i++){
                    // Add the page to the database if it doesn't already exist
                    if(!(await SearchResultModel.exists({url: contactLinks[i]}))){
                        // Add these links to the queue
                        await SearchResultModel.create({
                            url: contactLinks[i],
                            search: searchResult.search,
                            searchResult: searchResult._id,
                            location: searchResult.location,
                            segment: searchResult.segment,
                            status: 'queued'
                        });
                        linkCount++;
                    }
                }
            }
            console.log(`Crawl complete with ${linkCount}`);
            done();
        } catch(e){
            searchResult.status = 'error';
            await searchResult.save();
            console.log(e);
            done(e);
        }
    }else{
        console.log('Search result queue is empty.');
        done();
    }
}