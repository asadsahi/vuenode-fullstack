const adminPolicy = require('./admin.routes.policy');

module.exports = app => {
  // User Routes

  /* eslint global-require: "off" */
  const users = require('./admin.controller');

  //   // Users collection routes
  app.route('/api/users').get(adminPolicy.isAllowed, users.list);

  //   // Single user routes
  app
    .route('/api/users/:userId')
    .get(adminPolicy.isAllowed, users.read)
    .put(adminPolicy.isAllowed, users.update)
    .delete(adminPolicy.isAllowed, users.delete);

  // Finish by binding the user middleware
  // app.param('userId', users.userByID);
};
