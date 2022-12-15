const CategoryModel = require('../../models/model.category');

module.exports = async function(job, done) {
    try {
        const category = await CategoryModel.findById(job.attrs.data.categoryId);
        console.log(`Fetching page ${category.nextPage} of ${category.lastPage} for category ${category.name}...`);
        const results = await category.loadNextPage();
        await category.save();
        if(results){
            delete results.videos;
            console.log(`Category fetch complete`, results);
        }else{
            console.log(`Category fetch complete, no videos found.`);
        }
        done();
    } catch(e){
        console.log('Error loading category', e);
        done(e);
    }
};