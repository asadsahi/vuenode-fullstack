const passport = require('passport');

module.exports = (app) => {
  // Add passport's middleware
  app.use(passport.initialize());
  app.use(passport.session());
  /* eslint global-require: "off" */
  require('./strategies/facebook')();
  require('./strategies/google')();
  require('./strategies/github')();
  require('./strategies/jwt')();
  require('./strategies/local')();

  // globby([__dirname + '/strategies/*.js']).then(strategies => {
  //   strategies.forEach(strategy => {
  //     require(path.resolve(strategy))();
  //   });
  // });


  // var context = require.context("./strategies", true, /\.js$/);
  // var obj = {};
  // context.keys().forEach(function (key) {
  //   obj[key] = context(key);
  // });

  // Register User routes
  require('./user.routes')(app);

  // Register Admin routes
  require('./admin.routes')(app);
};
