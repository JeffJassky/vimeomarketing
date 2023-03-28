// Connect to the database
require('./mongo-connection');

module.exports = {
  setupInitialData: require('./setup-initial-data')
}
