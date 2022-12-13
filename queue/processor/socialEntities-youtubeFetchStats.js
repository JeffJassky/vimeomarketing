const SocialEntityModel = require('../../models/model.social-entity');
const MediaModel = require('../../models/model.media');

const queue = require('../index');
const moment = require('moment');

module.exports = async function(job, done){
  try {
    const cutoff = moment().add(1, 'hours').toDate();
    const socialEntities = await SocialEntityModel.find({
      platform: 'youtube',
      url: { $ne: true },
      $or: [
        { 'statistics.expires': { $lt: cutoff } },
        { 'statistics.expires': { $exists: false } },
      ]
    }).limit(5);
    socialEntities.forEach(socialEntity => {
      console.log(`Queueing YT fetch for ${socialEntity._id}`);
      queue.now('fetch-youtube-channel-stats-2', { socialEntityId: socialEntity._id});
    });

    // const media = await MediaModel.find({
    //   platform: 'youtube',
    //   mediaId: { $ne: true },
    //   $or: [
    //     { 'statistics.expires': { $lt: cutoff } },
    //     { 'statistics.expires': { $exists: false } },
    //   ]
    // });

    done();
  } catch (e) {
    done(e);
  }
}
