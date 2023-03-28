const SearchResultModel = require('../../models/model.searchResult');
const SearchModel = require('../../models/model.search');
const SegmentModel = require('../../models/model.segment');
const commonWords = require('../../services/commonWords');


module.exports = async function(job, done){
    // get the job data
    const { searchResultId } = job.attrs.data;
    const searchResult = await SearchResultModel.findById(searchResultId);
    if(searchResult.status === 'fullscored'){
        console.log('Already scored', searchResultId);
        done();
        return;
    }

    if(searchResult){
        try{

            let segment = await SegmentModel.findById(searchResult.segment);
            if(!segment){
                // Default to video production segment if segment is not found
                segment = await SegmentModel.findOne();
            }
            const agg = SearchModel.aggregate([
                {
                    $match: { _id: searchResult.search }
                },
                {
                    $project: {
                        numOrganicResults: {
                            $size: {
                                $ifNull: [ "$results.organicResults", [] ]
                            }
                        },
                        googleResultIndex: {
                            $indexOfArray: [ "$results.organicResults.url", searchResult.url ]
                        }
                    }
                }
            ]);
            const search = await agg.exec()
            let numOrganicResults = -1;
            let googleResultIndex = -1;
            let percentageInResults = -1;
            if(search && search.length){
                numOrganicResults = search[0].numOrganicResults;
                googleResultIndex = search[0].googleResultIndex;
                percentageInResults = Math.round(100 / numOrganicResults * googleResultIndex);
            }
            const searchableText = commonWords.removeCommonWords(`${searchResult.title} ${searchResult.url} ${searchResult.text}`);

            searchResult.segmentScore = Object.assign(searchResult.segmentScore,{
                text: commonWords.countWords(searchableText, segment.positiveScoringWords, false),
                description: commonWords.countWords(searchResult.description, segment.positiveScoringWords, false),
                title: commonWords.countWords(searchResult.title, segment.positiveScoringWords, false),
                url: commonWords.countWords(searchResult.url, segment.positiveScoringWords, false)
            });
            searchResult.segmentScore.total = searchResult.segmentScore.text + searchResult.segmentScore.title + searchResult.segmentScore.url + searchResult.segmentScore.description;
            searchResult.rank = googleResultIndex;
            searchResult.status = 'fullscored';
            await searchResult.save();
            console.log(`Score: pos ${searchResult.rank || 'na'} (${percentageInResults || 'na'}%)  score ${searchResult.segmentScore.total} - ${searchResult.url}`);
            done();
        } catch(e){
            searchResult.status = 'error';
            await searchResult.save();
            console.log(e);
            done(e);
        }
    }else{
        console.log(`Search result ID: ${searchResultId} not found`);
        done(new Error(`Search result ID: ${searchResultId} not found`));
    }
}
