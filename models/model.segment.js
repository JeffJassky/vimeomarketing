const baseModel = require('./base.model');

module.exports = baseModel({
  name: 'Segment',
  data:{
    name: {
      type: String,
      required: true,
      trim: true
    },
    queryPattern: {
      type: String,
      required: true,
      trim: true
    },
    positiveScoringWords: {
      type: Array,
      required: false
    },
    confidenceQuery: {
      type: String,
      required: true,
      trim: true
    }
  }
});