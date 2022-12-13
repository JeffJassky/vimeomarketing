const baseModel = require('./base.model');
const mongoose = require('mongoose');
const queue = require('../queue');

module.exports = baseModel({
  name: 'Search',
  data:{
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true
    },
    segment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Segment',
      required: true
    },
    status: {
      type: String,
      default: 'queued'
    },
    results: {
      type: Object,
      default: {}
    }
  },
  // onCreate(){
  //   console.log('Search created. Queueing now.');
  //   queue.now('search-execute', {
  //     searchId: this._id
  //   });
  // }
});