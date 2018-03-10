const appCtrl = require('./app.controller');

// select all
module.exports = app => {
  // Application data route
  app.route('/api/SetLanguage').post(appCtrl.setLanguage);

  app.route('/api/applicationdata').get(appCtrl.get);
};
