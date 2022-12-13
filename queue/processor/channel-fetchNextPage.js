const ChannelModel = require('../../models/model.channel');

module.exports = async function(job, done) {
    try {
        const channel = await ChannelModel.findById(job.attrs.data.channelId);
        console.log(`Fetching page ${channel.nextPage} of ${channel.lastPage} for channel ${channel.name}...`);
        const results = await channel.loadNextPage();
        if(results){
            await channel.save();
            delete results.videos;
            console.log(`Channel fetch complete`, results);
        } else {
            console.log(`Channel fetch complete, no videos found.`);
        }
        done();
    } catch(e){
        console.log('Error loading channel', e);
        done(e);
    }
};