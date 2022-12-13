module.exports = modelName => {
  const Model = global.db.model(modelName);
  return async (req, res, next) => {
    const documentId = (
      req.params[`${Model.objectName}Id`] || //path/to/:objectId
      res.locals[Model.objectName]._id // res.locals.object
    );
    const document = await Model.findOne({ _id: documentId });
    if(document){
      res.locals[Model.objectName] = document;
      next();
    }else{
      next(document);
    }
  };
}
