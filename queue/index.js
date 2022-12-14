const { Agenda } = require("agenda/es");

console.debug('Agenda attempting to connect to mongo', process.env.MONGODB_URI);



const queue = new Agenda({
    db: { address: process.env.MONGODB_URI },
    processEvery: '5 seconds',
    maxConcurrency: 5,
    defaultConcurrency: 1
});

module.exports = queue;

(async function(){

  queue.on('ready', async () => {

    // ==========================
    // IMPORT QUEUE FUNCTIONS
    // ==========================
    const concurrentTasks = {
        'search-queue': require('./processor/search-queue'),
        'search-execute': require('./processor/search-execute'),
        'searchResult-crawl': require('./processor/searchResult-crawl'),
        'searchResult-queue': require('./processor/searchResult-queue'),
        'searchResult-score': require('./processor/searchResult-score'),
        'channel-fetchNextPage': require('./processor/channel-fetchNextPage'),
        'channel-queueFetchNextPage': require('./processor/channel-queueFetchNextPage'),
        'category-fetchNextPage': require('./processor/category-fetchNextPage'),
        'category-queueFetchNextPage': require('./processor/category-queueFetchNextPage')
    };

    // ==========================
    // START THE QUEUE
    // ==========================
    Object.keys(concurrentTasks).forEach(key => {
      queue.define(key, concurrentTasks[key])
    })

    // ==========================
    // RECURRING QUEUE JOBS
    // ==========================


      queue.every('1 minute', [
          'search-queue',
          'searchResult-queue',
          'channel-queueFetchNextPage',
          'category-queueFetchNextPage'
      ]);

    // Start the queue.
    await queue.start();
  });

  // ==========================
  // QUEUE EVENT LISTENERS/HANDLERS
  // ==========================
  queue
      .on('error', function(error) {
        // An error occured.
        console.error(Date.now(), 'ERROR', error);
      })
      .on('waiting', function(jobId){
        // A Job is waiting to be processed as soon as a worker is idling.
        console.log(Date.now(), 'WAITING', jobId);
      })
      .on('active', function(job, jobPromise){
        // A job has started. You can use `jobPromise.cancel()`` to abort it.
        console.log(Date.now(), 'ACTIVE', job.data.type);
      })
      .on('stalled', function(job){
        // A job has been marked as stalled. This is useful for debugging job
        // workers that crash or pause the event loop.
        console.log(Date.now(), 'STALLED', job);
      })
      .on('progress', function(job, progress){
        // A job's progress was updated!
        console.log(Date.now(), 'PROGRESS', job.data.type, job.data.id, progress);
      })
      .on('completed', function(job, result){
        // A job successfully completed with a `result`.
        console.log(Date.now(), 'COMPLETED', job.data.type);
      })
      .on('failed', function(job, err){
        // A job failed with reason `err`!
        console.log(Date.now(), 'FAILED', err);
      })
      .on('paused', function(){
        // The queue has been paused.
        console.log(Date.now(), 'PAUSED');
      })
      .on('resumed', function(job){
        // The queue has been resumed.
        console.log(Date.now(), 'RESUMED', job);
      })
      .on('cleaned', function(jobs, type) {
        // Old jobs have been cleaned from the queue. `jobs` is an array of cleaned
        // jobs, and `type` is the type of jobs cleaned.
        console.log(Date.now(), 'CLEANED', jobs, type);
      })
      .on('drained', function() {
        // Emitted every time the queue has processed all the waiting jobs (even if there can be some delayed jobs not yet processed)
        console.log(Date.now(), 'DRAINED');
      })
      .on('removed', function(job){
        // A job successfully removed.
        console.log(Date.now(), 'REMOVED', job);
      });




  // Graceful shutdown
  // let graceful = () => {
  //   console.log(queue.stop(() => process.exit(0)));
  // };
  // process.on("SIGTERM", graceful);
  // process.on("SIGINT", graceful);

})();
