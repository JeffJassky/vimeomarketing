const MediaModel = require('../../models/model.media');
const youTubeScrape = require('../../services/youtube/scrape');
const moment = require('moment');

module.exports = async function(job, done){
    try {
        const date = new Date().toISOString().substring(0,10);
        const media = await MediaModel.findOne({
            // _id: job.attrs.data.mediaId
            _id: '63944df264283a00bb64c736',
            [`statSnapshots.${date}`]: {
                $ne: true
            }
        });
        const results = await youTubeScrape.getMediaStatistics(
            [media.mediaId]
        );
        if(results && results.length > 0){
            if(!media.statSnapshots){
                media.statSnapshots = {};
            }
            const snapshot = results[0].statistics;
            for(const key in snapshot){
                snapshot[key] = Number(snapshot[key])
            }
            media.likes = snapshot.likeCount;
            media.views = snapshot.viewCount;
            media.comments = snapshot.commentCount;
            media.statSnapshots[date] = snapshot
            await media.save();
            return done();
        }
        console.log('Failed to take media stat snapshot', e);
        done(results);
    } catch (e) {
        console.error(e);
        done(e);
    }
}
