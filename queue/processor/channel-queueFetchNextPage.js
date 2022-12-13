const ChannelModel = require('../../models/model.channel');
const queue = require('../../queue');

module.exports = async function(job, done) {
    console.log('Checking for channels to fetch...');
    try {
        const channels = await ChannelModel.find({
            $or: [
                { hasNextPage: true },
                { lastChecked: { $lt: new Date(new Date().getTime() - 60 * 60 * 24 * 1000) } },
                { lastChecked: { $exists: false } }
            ]
        }).limit(1);
        if(channels){
            try {
                for(const channel of channels){
                    queue.now('channel-fetchNextPage', {channelId: channel._id});
                }
                console.log(`Queued ${channels.length} channels to fetch.`);
                done();
            } catch(e){
                console.log('Error loading channels', e);
                done(e);
            }
        }else{
            console.log('All channels are up to date.');
            done();
        }
    } catch (e) {
        console.log(e);
        done(e);
    }
};