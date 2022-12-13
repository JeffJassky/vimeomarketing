const  Video = require('../../models/model.video');
module.exports = async function(req, res, next){
  const video = await Video.findOne({
    credits: { $gt: 0 },
    creditsRaw: { $exists: false}
  });
  if(video){
    await video.loadCredits();
  }else{
    res.send('No more credits to load');
  }


  next();
}
