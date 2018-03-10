const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const users = require('../user.controller');

module.exports = () => {
  // Use facebook strategy
  passport.use(new FacebookStrategy(
    {
      clientID: global.appConfig.facebook.clientID,
      clientSecret: global.appConfig.facebook.clientSecret,
      callbackURL: global.appConfig.facebook.callbackURL,
      profileFields: ['id', 'name', 'displayName', 'emails', 'photos'],
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      // Set the provider data and include tokens
      /* eslint no-underscore-dangle: "off" */
      const providerData = profile._json;
      providerData.accessToken = accessToken;
      providerData.refreshToken = refreshToken;

      // Create the user OAuth profile
      const providerUserProfile = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        displayName: profile.displayName,
        email: profile.emails ? profile.emails[0].value : undefined,
        username: profile.username || generateUsername(profile),
        profileImageURL: (profile.id) ? `//graph.facebook.com/${profile.id}/picture?type=large` : undefined,
        provider: 'facebook',
        providerIdentifierField: 'id',
        providerData,
      };

      // Save the user OAuth profile
      users.saveOAuthUserProfile(providerUserProfile, done);

      function generateUsername(prof) {
        let username = '';

        if (prof.emails) {
          /* eslint prefer-destructuring: "off" */
          username = prof.emails[0].value.split('@')[0];
        } else if (prof.name) {
          username = prof.name.givenName[0] + prof.name.familyName;
        }

        return username.toLowerCase() || undefined;
      }
    }
  ));
};
