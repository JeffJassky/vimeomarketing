const  User = require('../../models/model.user');
module.exports = async function(req, res, next){
  const users = (await User.find())
    .filter(user => user.emailAddresses.length > 0)
    .map(user => {
      return {
        name: user.name,
        location: user.location,
        emails: user.emailAddresses,
        roles: user.roles,
        videos: user.videos
      }
    });

  res.send({
    userCount: users.length,
    users
  });
  next();
}
