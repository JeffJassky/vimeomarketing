const baseModel = require('./base.model');
const mongoose = require('mongoose');

module.exports = baseModel({
  name: 'SearchResult',
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
    search: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Search',
      required: true
    },
    searchResult: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SearchResult',
      required: false
    },
    url: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    text: {
      type: String,
      trim: true
    },
    html: {
      type: String
    },

    // The search result rank from Google
    rank: {
      type: Number,
      default: 1000
    },

    // Not used yet
    segmentScore: {
      type: Object,
      default: {}
    },
    // Not used yet
    scoring: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default: "queued"
    }
  }
});