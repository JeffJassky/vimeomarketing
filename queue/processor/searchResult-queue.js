const SearchResultModel = require('../../models/model.searchResult');
const queue = require('../../queue');

module.exports = async function(job, done){
    console.log('Checking for searchResults to queue');
    try{


        // Newly created search results
        const searchResults = await SearchResultModel.find({
            $or: [
                { status: 'queued' },
                {
                    status: 'processing',
                    createdAt: { $lt: new Date(new Date().getTime() - 60 * 60 * 1000) }
                }
            ]
        });
        for(const searchResult of searchResults){
            searchResult.status = 'waiting-to-crawl';
            await searchResult.save();
            queue.now('searchResult-crawl', {searchResultId: searchResult._id});
        }
        console.log('Queued', searchResults.length, 'search results');

        // Ones to score
        const crawledSearchResults = await SearchResultModel.find({ status: 'crawled'}).select('_id');

        for(const searchResult of crawledSearchResults){
            queue.now('searchResult-score', {searchResultId: searchResult._id});
        }

        // // Ones to enrich
        // const scoredSearchResults = await SearchResultModel.find({ status: 'scored' });
        // for(const searchResult of scoredSearchResults){
        //     queue.now('searchResult-enrich', {searchResultId: searchResult._id});
        //     searchResult.status = 'waiting-to-enrich';
        //     await searchResult.save();
        // }

        console.log('Waiting to score', crawledSearchResults.length, 'search results');
        done();
    } catch(e){
        console.log(e);
        done(e)
    }
}