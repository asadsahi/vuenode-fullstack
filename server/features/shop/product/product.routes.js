// const productPolicy = require('./product.policy');
const productCtrl = require('./product.controller');

// select all
module.exports = app => {
  app
    .route('/api/product')
    // .all(productPolicy.isAllowed)
    .get(productCtrl.getAll)
    .post(productCtrl.post);

  app
    .route('/api/product/:id')
    .get(productCtrl.get)
    .put(productCtrl.put)
    .delete(productCtrl.delete);
};
