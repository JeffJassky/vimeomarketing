const mongoose = require('mongoose');

global.db = mongoose.createConnection(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
);

console.log('Commecting to Mongo...', process.env.MONGODB_URI);
global.db.then(() => {
  console.log('Connected to Mongo.', process.env.MONGODB_URI);
}).catch(error => {
  console.log('Could not connect to Mongo.', process.env.MONGODB_URI, error);
});
