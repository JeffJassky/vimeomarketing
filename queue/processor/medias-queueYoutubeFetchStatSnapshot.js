const MediaModel = require('../../models/model.media');
const queue = require('../index');

module.exports = async function(job, done){
    try {
        const date = new Date().toISOString().substring(0,10);
        const medias = await MediaModel.find({
            collab: { $exists: true },
            [`statSnapshots.${date}`]: {
                $exists: false
            }
        }).limit(5);
        medias.forEach(media => {
            queue.now('media-youtubeFetchStatSnapshot', {
                mediaId: media._id
            });
        });
        console.log(`MEDIAS QUEUE YOUTUBE FETCH STAT SNAPSHOT: Scheduling fetch for ${medias.length} media.`);
        done();
    } catch (e) {
        console.error(e);
        done(e);
    }
}
