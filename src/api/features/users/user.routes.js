const passport = require('passport');
const multer = require('multer');
const multerConfig = {
  // dest: './profile/images/',
  limits: {
    fileSize: 1 * 1024 * 1024, // Max file size in bytes (1 MB)
  },
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpg' &&
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/gif'
    ) {
      const err = new Error();
      err.code = 'UNSUPPORTED_MEDIA_TYPE';
      return callback(err, false);
    }
    return callback(null, true);
  },
};

module.exports = (app) => {
  /* eslint global-require: "off" */
  // User Routes
  const users = require('./user.controller');

  // =============== OAUTH ROUTES (public routes) =================
  // Setting up the users password api
  app.route('/api/auth/forgotpassword').post(users.forgot);
  app.route('/api/auth/reset/:token').get(users.validateResetToken);
  app.route('/api/auth/reset/:token').post(users.reset);

  // Setting up the users authentication api
  app.route('/api/auth/signup').post(users.signup);
  app.route('/api/auth/signin').post(users.signin);
  app.route('/api/auth/signout').get(users.signout);

  // Setting the facebook oauth routes
  app.route('/api/auth/facebook').get(users.oauthCall('facebook', {
    session: false,
    scope: ['email'],
  }));
  app.route('/api/auth/facebook/callback').get(users.oauthCallback('facebook'));

  // Setting the windowslive oauth routes
  app.route('/api/auth/windowslive').get(users.oauthCall('windowslive', {
    session: false,
    scope: ['wl.signin', 'wl.basic'],
  }));
  app
    .route('/api/auth/windowslive/callback')
    .get(users.oauthCallback('windowslive'));

  // Setting the google oauth routes
  app.route('/api/auth/google').get(users.oauthCall('google', {
    session: false,
    scope: ['openid', 'profile', 'email'],
  }));
  app.route('/api/auth/google/callback').get(users.oauthCallback('google'));

  // Setting the linkedin oauth routes
  app.route('/api/auth/linkedin').get(users.oauthCall('linkedin', {
    session: false,
    scope: ['r_basicprofile', 'r_emailaddress'],
  }));
  app.route('/api/auth/linkedin/callback').get(users.oauthCallback('linkedin'));

  // Setting the github oauth routes
  app.route('/api/auth/github').get(users.oauthCall('github'));
  app.route('/api/auth/github/callback').get(users.oauthCallback('github'));

  // Setting the paypal oauth routes
  app.route('/api/auth/paypal').get(users.oauthCall('paypal'));
  app.route('/api/auth/paypal/callback').get(users.oauthCallback('paypal'));

  // ==== all routes after this will be secured
  app.route('/api/*').all(passport.authenticate('jwt', { session: false }));

  // =============== USERS ROUTES (secure routes) =================
  // Setting up the users profile api
  app.route('/api/profile').get(users.getProfile);
  app.route('/api/profile').put(users.updateProfile);
  app.route('/api/users/accounts').delete(users.removeOAuthProvider);
  app.route('/api/users/password').post(users.changePassword);
  app.post(
    '/api/users/picture',
    multer(multerConfig).single('newProfilePicture'),
    users.changeProfilePicture
  );
  app.get('/api/users/picture/:id', users.getProfilePicture);

  // Finish by binding the user middleware
  // app.param('userId', users.userByID);
};
