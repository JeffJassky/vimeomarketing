const CategoryModel = require('../../models/model.category');
const queue = require('../../queue');

module.exports = async function(job, done) {
    console.log('Checking for categories to fetch...');
    try {
        const categories = await CategoryModel.find({
            $or: [
                { hasNextPage: true },
                { lastChecked: { $lt: new Date(new Date().getTime() - 60 * 60 * 24 * 1000) } },
                { lastChecked: { $exists: false } }
            ]
        }).limit(1);
        if(categories){
            try {
                for(const category of categories){
                    queue.now('category-fetchNextPage', {categoryId: category._id});
                }
                console.log(`Queued ${categories.length} categories to fetch.`);
                done();
            } catch(e){
                console.log('Error loading categories', e);
                done(e);
            }
        }else{
            console.log('All categories are up to date.');
            done();
        }
    } catch (e) {
        console.log(e);
        done(e);
    }
};