module.exports = modelName => {
  const Model = global.db.model(modelName);
  return async (req, res, next) => {
    const documents = await Model.find();
    documents ? res.send(documents) : next(documents);
  }
}
