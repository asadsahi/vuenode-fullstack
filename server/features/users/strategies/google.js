const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const users = require('../user.controller');

module.exports = () => {
  // Use google strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: global.appConfig.google.clientID,
        clientSecret: global.appConfig.google.clientSecret,
        callbackURL: global.appConfig.google.callbackURL,
        passReqToCallback: true
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
          email: profile.emails[0].value,
          username: profile.username || profile.emails[0].value,
          profileImageURL: providerData.picture
            ? providerData.picture
            : undefined,
          provider: 'google',
          providerIdentifierField: 'id',
          providerData
        };

        // Save the user OAuth profile
        users.saveOAuthUserProfile(providerUserProfile, done);
      }
    )
  );
};
