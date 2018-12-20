const productCategoryCtrl = require('./productcategory.controller');

// select all
module.exports = app => {
  app
    .route('/api/productcategory')
    // .all(productCategoryPolicy.isAllowed)
    .get(productCategoryCtrl.getAll)
    .post(productCategoryCtrl.post);

  app
    .route('/api/productcategory/:id')
    .get(productCategoryCtrl.get)
    .put(productCategoryCtrl.put)
    .delete(productCategoryCtrl.delete);
};
