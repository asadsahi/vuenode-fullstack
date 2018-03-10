const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const DB = require('../../../db/models');
const { User } = DB;

module.exports = () => {
  // Use local strategy
  passport.use(new LocalStrategy(
    {
      usernameField: 'usernameOrEmail',
      passwordField: 'password',
    },
    (usernameOrEmail, password, done) => {
      User.findOne({
        include: [
          { model: DB.Role, attributes: ['id', 'name'] },
          { model: DB.UserImage, attributes: ['id'] },
        ],
        where: {
          $or: [
            {
              username: {
                $eq: usernameOrEmail.toLowerCase(),
              },
            },
            {
              email:
                {
                  $eq: usernameOrEmail.toLowerCase(),
                },
            },
          ],
        },
      }).then((user) => {
        if (!user || !user.validPassword(password)) {
          return done(null, false, `Invalid username or password (${(new Date()).toLocaleTimeString()})`);
        }
        return done(null, user);
      }).catch((err) => done(err));
    }
  ));
};
