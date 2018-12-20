// const orderPolicy = require('./order.policy');
const orderCtrl = require('./order.controller');

// select all
module.exports = app => {
  app
    .route('/api/order')
    // .all(orderPolicy.isAllowed)
    .get(orderCtrl.getAll)
    .post(orderCtrl.post);

  app
    .route('/api/order/:id')
    .get(orderCtrl.get)
    .put(orderCtrl.put)
    .delete(orderCtrl.delete);
};
