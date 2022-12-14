// Connect to the database
require('./mongo-connection');
require('../models/model.searchResult');

module.exports = {
  setupInitialData: require('./setup-initial-data')
}
