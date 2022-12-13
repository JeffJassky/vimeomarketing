const SearchModel = require('../../models/model.search');
const SegmentModel = require('../../models/model.segment');
const LocationModel = require('../../models/model.location');

module.exports = async function(job, done){
    try{
        const searches = [];
        const segments = await SegmentModel.find();
        const locations = await LocationModel.find();
        const existingSearches = await SearchModel.find();

        for (let i = 0; i < segments.length; i++) {
            for (let j = 0; j < locations.length; j++) {
                const search = {
                    segment: segments[i]._id,
                    location: locations[j]._id
                };
                const existingSearch = existingSearches.find(existingSearch => {
                    return existingSearch.segment.toString() === search.segment.toString() &&
                        existingSearch.location.toString() === search.location.toString();
                });
                if (!existingSearch) {
                    searches.push(search);
                }
            }
        }
        if(searches.length){
            console.log(`Adding ${searches.length} searches`);
            await SearchModel.insertMany(searches);
        }

        // Requeue old hanging jobs
        const oneHourAgo = new Date(new Date().getTime() - 60 * 60 * 1000);
        for(const search of searches){
            if(search.status === 'processing' && oneHourAgo > search.createdAt){
                console.log('This search is older than an hour. Re-queueing.');
                search.status = 'queued';
                await search.save();
            }
        }

        done();
    } catch(e){
        done(e)
    }
}