const globby = require('globby');
const path = require('path');

module.exports = function apiMiddlewares(app) {
  apiRoutes(app);
};

function apiRoutes(app) {
  /* eslint global-require: "off" */
  globby([`${__dirname}/./features/*/**/*.policy.js`]).then(policies => {
    policies.forEach(policyPath => {
      require(path.resolve(policyPath)).invokeRolesPolicies();
    });
  });

  // ========= Public routes
  // App public routes
  require('./features/app/app.routes')(app);
  // Content public routes
  require('./features/content/content-public.routes')(app);
  // ========= Secure routes
  // User's feature, this incldues auth middleware as well
  require('./features/users')(app);
  // Content public routes
  require('./features/content/content.routes')(app);
}
