const contentPolicy = require('./content.policy');
const contentCtrl = require('./content.controller');

// select all
module.exports = app => {
  app
    .route('/api/content/:locale')
    .all(contentPolicy.isAllowed)
    .get(contentCtrl.get)
    .put(contentCtrl.put);
};
