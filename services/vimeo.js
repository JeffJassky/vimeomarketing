const Vimeo = require('vimeo').Vimeo;
let client = new Vimeo(
  process.env.VIMEO_CLIENT_ID,
  process.env.VIMEO_SECRET,
  process.env.VIMEO_ACCESS_TOKEN
);

const queue = [];

module.exports = {
  client,
  request: function(options){
    return new Promise(async (resolve, reject) => {
      client.request(options, function(error, body, statusCode, headers){
        console.log(`Vimeo API Response: ${statusCode}`);
        if(error){
          reject(error)
        }
        if(body){
          resolve(body);
        }
      })
    })
  }
};
