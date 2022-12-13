const SearchModel = require('../../models/model.search');
const SegmentModel = require('../../models/model.segment');
const LocationModel = require('../../models/model.location');
const SearchResultModel = require('../../models/model.searchResult');
const axios = require('axios');

// Create an instance using the config defaults provided by the library
// At this point the timeout config value is `0` as is the default for the library
const api = axios.create({
    baseURL: 'https://api.apify.com'
});

function map(num, inMin, inMax, outMin, outMax) {
    return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

// 8 minutes in milliseconds
const SEARCH_JOB_TIMEOUT = 5 * 60 * 1000;
api.defaults.timeout = SEARCH_JOB_TIMEOUT;

module.exports = async function(job, done){
    console.log('Checking Search job queue');
    const search = await SearchModel.findOne({status: 'queued'});
    try {
        if(search){
            console.log('Found search job. Executing.');
            search.status = 'processing';
            await search.save();
            const segment = await SegmentModel.findById(search.segment);
            const location = await LocationModel.findById(search.location);

            const queries = segment.queryPattern.replace('%location%', `${location.city}, ${location.state}`);
            const expectedResults = location.population / 7500;
            const resultsToLoad = Math.round(map(expectedResults, 0, 500, 50, 500));
            const resultsPerPage = resultsToLoad > 100 ? 100 : Math.ceil(resultsToLoad / 10) * 10;
            const maxPagesPerQuery = Math.ceil(resultsToLoad / resultsPerPage);
            const settings = {
                csvFriendlyOutput: false,
                customDataFunction: "async ({ input, $, request, response, html }) => {\n  return {\n    pageTitle: $('title').text(),\n  };\n};",
                includeUnfilteredResults: false,
                mobileResults: false,
                saveHtml: false,
                saveHtmlToKeyValueStore: false,
                queries,
                resultsPerPage,
                maxPagesPerQuery,
            };

            console.log('Requesting search job from Apify', queries);

            const response = await api.post(
                `/v2/actor-tasks/futuristic_organ~google-search-scraper-task/run-sync-get-dataset-items?token=${process.env.APIFY_TOKEN}`,
                settings
            );

            if(response && response.data && response.data[0]){
                console.log('Search job complete. Saving results.');
                search.results = response.data[0];
                search.status = 'results-ready';
                await search.save();
                if(response.data[0].organicResults){
                    let newlyFoundCount = 0;
                    let old = 0
                    const searchResults = response.data[0].organicResults
                        .map((result, index) => Object.assign(result, {
                            search: search._id,
                            location: location._id,
                            segment: segment._id,
                            rank: index + 1
                        }));
                    // Remove results that already exist
                    for(const i in searchResults){
                        if(await SearchResultModel.exists({url: searchResults[i].url})){
                            delete searchResults[i][i];
                            old++
                        }else{
                            newlyFoundCount++
                        }
                    }
                    try{
                        await SearchResultModel.insertMany(searchResults, {
                            ordered: false
                        });
                    }catch(e){
                        console.log('Error inserting search results', e.writeErrors);
                    }

                    console.log(`Search results saved: ${newlyFoundCount}. Already existed: ${old}`);
                }
                done();
            }else{
                console.log('Search job failed. No data returned.');
                done(response);
            }
        }else{
            console.log('Search job queue empty.');
        }
        done();
    } catch(e) {
        console.log('Error executing search', e);
        if(e.data){
            console.log(e.data);
        }else if(e.response && e.response.data){
            console.log(e.response.data);
        }
        search.status = 'error';
        await search.save();
        done(e)
    }
}