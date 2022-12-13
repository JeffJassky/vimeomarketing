const s3 = require('../../services/s3/index');
const uploadGifsToS3 = function(job, done) {
  console.log('S3 UPLOAD JOB NEEDS CONFIGURING')
  done();
  // Upload gifs to S3
  // s3.upload(job.data.paths)
  //   .then(imagePaths => {
  //     visitModel.findById(job.data.visitId).then(visit => {
  //       visit.photos.push(
  //         process.env.AWS_S3_SERVER + '/' + process.env.AWS_S3_BUCKET_NAME + '/' + visit._id
  //       );
  //       visit.events.push({
  //         event: 'media:create'
  //       });
  //       visit.save().then(visit => {
  //         // Complete job
  //         done(null, imagePaths);
  //       }).catch(done)
  //     }).catch(done)
  //   }).catch(done)
}
module.exports = uploadGifsToS3;
