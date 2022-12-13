const  Category = require('../../models/model.category');
module.exports = async function(req, res, next){
  try{
    if(req.params.categoryName){
      const category = new Category({ name: req.params.categoryName.toLowerCase()});
      await category.save();
      res.send(category);
    }else{
      res.send('No category name defined');
    }
    next();
  } catch(e) {
    console.log(e);
    res.send('failed');
  }
}
