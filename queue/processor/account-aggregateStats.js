const AccountModel = require('../../models/model.account');
const SocialEntityModel = require('../../models/model.social-entity');

module.exports = async function(job, done){
    try {
        const accounts = await AccountModel.find().select('_id followers');
        let updatedAccountCount = 0;
        for(const index in accounts) {
            const account = accounts[index];
            let reach = 0;
            (await SocialEntityModel.find({
                account: account._id
            })).forEach(socialEntity => {
                reach = Math.max(
                    reach,
                    socialEntity.followers || 0
                );
            });
            if (reach != account.followers) {
                account.followers = reach;
                await account.save();
                updatedAccountCount++;
            }
        }
        console.log(`ACCOUNT AGGREATE STATS: Checked ${accounts.length} accounts updated ${updatedAccountCount}.`);
        done();
    } catch (e) {
        done(e);
    }
}
