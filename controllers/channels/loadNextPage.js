const  Channel = require('../../models/model.channel');
module.exports = async function(req, res, next){
  const channel = await Channel.findOne({ name: req.params.channelName });
  if(channel){
    console.log(channel);
    await channel.loadNextPage();
    await channel.save()
  }else{
    res.send('Channel not found');
  }
  next();
}
