const baseSchema = require('../schemas/base.schema');

module.exports = function(config){
  return db.model(config.name, baseSchema(config));
};
