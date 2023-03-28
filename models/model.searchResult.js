const baseModel = require('./base.model');
const mongoose = require('mongoose');

const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
const phoneRegex = /^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$/g;

module.exports = baseModel({
  name: 'SearchResult',
  data:{
    url: {
      type: String,
      required: true,
      unique: true
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location'
    },
    segment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Segment'
    },
    search: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Search'
    },
    searchResult: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SearchResult'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video'
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
  },
  computed: {
    emails(){
      return String(this.text).match(emailRegex);
    },
    phones(){
      return String(this.text).match(phoneRegex)
    }
  },
  statics: {
    async index(){
      try{
        const scoreThreshold = 50;
        console.log('results');

        const emails = [];
        (await this.find({
          "segmentScore.total": {
            $gt: scoreThreshold
          }
        }).select('-html'))
            .forEach(record => {
              if(record.emails){
                emails.push(...record.emails);
              }
            });
        console.log('emlen', emails.length);

        return [...new Set(emails)];
      } catch (e) {
        console.log(e);
        return [];
      }
    }
  }
});