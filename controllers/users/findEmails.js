const  User = require('../../models/model.user');
module.exports = async function(req, res, next){



  const emails = [...new Set((await User.find().select('bio shortBio'))
      .filter(user => user.emailAddresses.length > 0)
      .map(user => user.emailAddresses)
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
    emailCount: emails.length
  });
  next();
}
