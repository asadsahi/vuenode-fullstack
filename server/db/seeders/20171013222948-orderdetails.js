/* eslint-disable */

module.exports = {
  up: (queryInterface, Sequelize) => {
    const orderDetails = [];
    for (let i = 1; i < 11; i++) {
      orderDetails.push({
        unitPrice: 30 + i,
        quantity: 20 + i,
        discount: 10 + i,
        orderId: 1
      });
    }
    return queryInterface.bulkInsert('OrderDetails', orderDetails, {}).catch(e => Promise.resolve());
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('OrderDetails', null, {}),
};
