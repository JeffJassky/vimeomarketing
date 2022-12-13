require('dotenv').config();
require('../database');

const SegmentModel = require('../models/model.segment');

SegmentModel.insertMany([
    {
        name: "Video production agency",
        queryPattern: "video production agency los angelas ca AND (\"email\" OR \"contact\") -career -salary -library -church -directory -browse -search -dental",
        confidenceQuery: "video production agency"
    }
]);