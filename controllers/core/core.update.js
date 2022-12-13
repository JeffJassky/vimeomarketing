module.exports = modelName => {
  const Model = global.db.model(modelName);
  return async (req, res, next) => {
    Object.assign(res.locals[Model.objectName], req.body);
    const document = await res.locals[Model.objectName].save();
    if(document){
      res.locals[Model.objectName] = document;
      next();
    }else{
      next(document);
    }
  }
};
