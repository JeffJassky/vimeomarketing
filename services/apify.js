// apify sdk connection
const Apify = require('apify');
const sdk = new Apify({ token: process.env.APIFY_TOKEN });
module.exports = sdk;