module.exports = modelName => {
  const Model = global.db.model(modelName);
  return (req, res, next) => {
    if(res.locals[Model.objectName]){
      res.json(res.locals[Model.objectName]);
    }else{
      next(`No ${Model.name} found`)
    }
  };
}
