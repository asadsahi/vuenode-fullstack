/* eslint-disable */

module.exports = {
  up: (queryInterface, Sequelize) => {
    const orders = [];
    for (let i = 1; i < 11; i++) {
      orders.push({
        discount: 10 + i,
        comments: `Order comments ${i}`,
        productId: 1,
        customerId: 1
      });
    }
    return queryInterface.bulkInsert('Orders', orders, {}).catch(e => Promise.resolve());
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Orders', null, {}),
};
