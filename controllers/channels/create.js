const  Channel = require('../../models/model.channel');
module.exports = async function(req, res, next){
  try{
    if(req.params.channelName){
      const channel = new Channel({ name: req.params.channelName.toLowerCase()});
      await channel.save();
      res.send(channel);
    }else{
      res.send('No channel name defined');
    }
    next();
  } catch(e) {
    console.log(e);
    res.send('failed');
  }
}
