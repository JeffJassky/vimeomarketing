module.exports = modelName => {
  const Model = global.db.model(modelName);
  return async (req, res) => {
    const destroyed = await res.locals[Model.objectName].delete();
    res.json({ message: destroyed });
  };
}
