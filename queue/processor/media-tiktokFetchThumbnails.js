const Media = require('../../models/model.media');
const moment = require('moment');

module.exports = async function(job, done){
  try {
    const cutoff = moment().add(1, 'hours').toDate();
    const media = await Media.find({
      platform: 'tiktok',
      error: { $ne: 'Something went wrong' },
      $or: [
        { 'expires': { $lt: cutoff } },
        { 'expires': { $exists: false } },
      ]
    }).limit(50)

    console.log(`Resyncing ${media.length} media items expiring before ${cutoff}`);
    for(let i=0; i<media.length; i++){
      console.log(await media[i].resyncDetails());
    }
    console.log('Done resyncing media');
    done();
  } catch (e) {
    done(e);
  }
}
