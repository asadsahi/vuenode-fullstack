// const customerPolicy = require('./customer.policy');
const customerCtrl = require('./customer.controller');

// select all
module.exports = app => {
  app
    .route('/api/customer')
    // .all(customerPolicy.isAllowed)
    .get(customerCtrl.getAll)
    .post(customerCtrl.post);

  app
    .route('/api/customer/:id')
    .get(customerCtrl.get)
    .put(customerCtrl.put)
    .delete(customerCtrl.delete);
};
