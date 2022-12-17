const  User = require('../../models/model.user');
module.exports = async function(req, res, next){



  const websites = [...new Set((await User.find().select('bio shortBio'))
      .filter(user => user.allWebsites.length > 0)
      .map(user => user.allWebsites.filter(website => website.type==='link').map(website => website.link))
      .flat())];

  // const users = (await User.find().select('bio shortBio')
  //     .filter(user => user.emailAddresses.length > 0)
  //     .map(user => {
  //       return {
  //         name: user.name,
  //         location: user.location,
  //         emails: user.emailAddresses,
  //         roles: user.roles,
  //         videos: user.videos
  //       }
  //     });

  res.send({
    count: websites.length,
    websites
  });
  next();
}
