
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

require('dotenv').config();
require('../database');
const SearchResult = require('../models/model.searchResult');

(async () => {

    const training = (await SearchResult.find({
        status: 'fullscored',
        "segmentScore.total": { $gt: 100 }
    }).select('html').limit(1000)).map(r => ({
        textToClassify: r.html,
        label: 'good'
    }));

    // create a json file contaning the training data
    fs.writeFileSync('training.json', JSON.stringify(training));

    const testing = (await SearchResult.find({
        status: 'fullscored',
        "segmentScore.total": { $lt: 30 }
    }).select('html').limit(1000)).map(r => ({
        textToClassify: r.html,
        label: 'bad'
    }));
    fs.writeFileSync('testing.json', JSON.stringify(testing));


// // Preprocess the training and testing data
//     const tokenizer = new tf.
//
//     const trainingTexts = training.map(item => item.textToClassify);
//     const testingTexts = testing.map(item => item.textToClassify);
//
//     tokenizer.fit(trainingTexts.concat(testingTexts));
//
//     const trainingSequences = tokenizer.encode(trainingTexts);
//     const testingSequences = tokenizer.encode(testingTexts);
//
//     const inputShape = [trainingSequences.shape[1], trainingSequences.shape[2]];
//     const outputClasses = 2;
//
// // Build the model
//     const model = tf.sequential();
//
//     const lstmLayer = tf.layers.lstm({
//         units: 32,
//         inputShape: inputShape
//     });
//
//     const denseLayer = tf.layers.dense({
//         units: outputClasses,
//         activation: 'softmax'
//     });
//
//     model.add(lstmLayer);
//     model.add(denseLayer);
//
//     const optimizer = tf.train.adam();
//
//     model.compile({
//         optimizer: optimizer,
//         loss: 'categoricalCrossentropy',
//         metrics: ['accuracy']
//     });
//
// // Convert labels to one-hot encoded tensors
//     const trainingLabels = tf.oneHot(
//         tf.tensor1d(training.map(item => item.label), 'int32'),
//         outputClasses
//     );
//
//     const testingLabels = tf.oneHot(
//         tf.tensor1d(testing.map(item => item.label), 'int32'),
//         outputClasses
//     );
//
// // Train the model
//     const history = await model.fit(trainingSequences, trainingLabels, {
//         epochs: 10
//     });
//
// // Evaluate the model
//     const evaluation = model.evaluate(testingSequences, testingLabels);
//
//     console.log(evaluation);
})();