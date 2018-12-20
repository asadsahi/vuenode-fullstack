/* eslint-disable */

module.exports = {
  up: (queryInterface, Sequelize) => {
    const products = [];
    for (let i = 1; i < 101; i++) {
      products.push({
        name: `Product ${i}`,
        description: `${i} Product description`,
        icon: 'fa fa-product-hunt',
        buyingPrice: 10 + i,
        sellingPrice: 20 + i,
        unitsInStock: 30 + i,
        isActive: true,
        isDiscontinued: false,
        categoryId: 1,
      });
    }
    return queryInterface.bulkInsert('Products', products, {}).catch(e => Promise.resolve());
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Products', null, {}),
};
