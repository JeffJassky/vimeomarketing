module.exports = modelName => {
  const Model = global.db.model(modelName);
  return async (req, res, next) => {
    const document = await new Model(req.body).save();
    if(document){
      console.log('created', document._id)
      res.locals[Model.objectName] = document;
      next();
    }else{
      next(document);
    }
  };
}
