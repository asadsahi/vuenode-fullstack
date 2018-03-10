const contentCtrl = require('./content.controller');

// select all
module.exports = app => {
  // Content collection routes
  app.route('/api/content/list').get(contentCtrl.list);
};
