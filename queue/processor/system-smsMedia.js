const queue = require('../../queue');

const twilio = require('twilio')(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const MediaModel = require('../../models/model.media');

module.exports = function(job, done) {
  MediaModel
    .findById(job.data.mediaId)
    .then(media => {
      if(media.source){
        console.debug('Delivering text', job.data);
        twilio.messages.create(job.data, (err, data) => {
          if(err){
            done(err);
          }else{
            done(null, data)
          }
        });
      }else{
        // Fail with content missing error
        done(new Error('Waiting for media storage location'));
      }
    })
};
