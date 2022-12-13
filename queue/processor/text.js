const twilio = require('twilio')(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const TextModel = require('../../models/model.text');

module.exports = async function(job, done) {
  const text = await TextModel.findById(job.data.id);
  if(text){
    twilio.messages.create({
      to: text.to,
      from: text.from,
      body: text.body,
      media: text.media
    }, async (err, data) => {
      if(data){
        text.status = 'delivered';
        done(null, data);
      }else{
        text.status = 'error';
        done(err);
      }
      // Save the status and response
      await text.save();
    });
  }else{
    done(text);
  }
};
