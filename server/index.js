const path = require('path');
const _ = require('lodash');
const globby = require('globby');
const isDev = process.env.NODE_ENV !== 'production';
const isProd = !isDev;
global.appConfig = _.merge(
  {},
  require('./config.json'),
  require('./config.prod.json'),
  {
    isDev,
    isProd
  }
);

module.exports = function apiMiddlewares(app) {
  globby([`${__dirname}/features/*/**/*.policy.js`]).then(policies => {
    policies.forEach(policyPath => {
      /* eslint import/no-dynamic-require: "off" */
      require(path.resolve(policyPath)).invokeRolesPolicies();
    });
  });

  // ========= Public routes
  // App public routes
  require('./features/app/app.routes')(app);
  // Content public routes
  require('./features/content/content-public.routes')(app);
  // ========= Secure routes
  require('./features/auth')(app);

  // Content public routes
  require('./features/content/content.routes')(app);

  // Examples
  // Shop routes
  require('./features/shop/customer/customer.routes')(app);
  require('./features/shop/productcategory/productcategory.routes')(app);
  require('./features/shop/product/product.routes')(app);
  require('./features/shop/order/order.routes')(app);
};
