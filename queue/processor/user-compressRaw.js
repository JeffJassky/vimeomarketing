

module.exports = async function(job, done) {
    try {
        if (!user) {
            return done(new Error('User not found'));
        }
        await user.compressRaw();
        console.log({user});
        done();
    } catch (error) {
        console.log(`Could not compress user raw data`, error);
        return done(error);
    }
}