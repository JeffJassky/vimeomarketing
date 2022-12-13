const SocialEntityModel = require('../../models/model.social-entity');
const youTubeScrape = require('../../services/youtube/scrape');
const moment = require('moment');

module.exports = async function(job, done){
  try {
    if(job.attrs.data.socialEntityId){
      const socialEntity = await SocialEntityModel.findOne({
        _id: job.attrs.data.socialEntityId
      })
      if(!socialEntity.statistics){
        socialEntity.statistics = {};
      }

      if(socialEntity.identifier || socialEntity.url){
        try{
          let stats;
          if(socialEntity.identifier){
            stats = await youTubeScrape.scrapeByChannelId(socialEntity.identifier)
          }else if(socialEntity.url){
            stats = await youTubeScrape.scrapeByUrl(socialEntity.url)
          }
          
          if(stats){
            socialEntity.followers = stats.channelSubscribers;
            socialEntity.identifier = stats.channelId;
            socialEntity.statistics = {
              expires: moment().add('1 week').toDate(),
              subscribers: stats.channelSubscribers,
              videos: stats.channelVideoCount,
              views: stats.channelViewCount,
              avgViews: Math.round(stats.mediaViewCount / stats.channelVideoCount),
              avgLikes: Math.round(stats.mediaLikeCount / stats.channelVideoCount),
              avgComments: Math.round(stats.mediaCommentCount / stats.channelVideoCount),
            };
            console.log(socialEntity.statistics)
            const saved = await socialEntity.save();
            console.log({saved})
            done();
          }else{
            throw stats;
          }
        } catch(e) {
          console.log('Stats scrape failed', e);
          socialEntity.statistics.expires = moment().add('6 hours').toDate();
          socialEntity.statistics.error = e;
          const saved = await socialEntity.save();
          console.log({saved})
          done(e);
        }
      }else{
        throw new Error('SocialEntity doesnt have URL');
      }
    }else{
      throw new Error('No socialEntityId defined');
    }
  } catch (e) {
    console.error(e);
    done(e);
  }
}
