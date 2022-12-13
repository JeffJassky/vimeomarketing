const baseModel = require('./base.model');

module.exports = baseModel({
  name: 'Location',
  data:{
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    population: {
      type: Number
    },
    country: {
      type: String,
      required: true,
      trim: true,
      default: 'United States'
    }
  }
});