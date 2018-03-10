const passport = require('passport');

module.exports = (app) => {
  // Add passport's middleware
  app.use(passport.initialize());
  app.use(passport.session());
  /* eslint global-require: "off" */
  require('./strategies/facebook')();
  require('./strategies/google')();
  require('./strategies/jwt')();
  require('./strategies/local')();

  // Register User routes
  require('./user.routes')(app);

  // Register Admin routes
  require('./admin.routes')(app);
};
