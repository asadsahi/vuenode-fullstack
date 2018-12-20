/* eslint-disable */

module.exports = {
  up: (queryInterface, Sequelize) => {
    const customer = [];
    for (let i = 1; i < 101; i++) {
      customer.push({
        name: `Customer ${i}`,
        email: `test${i}@email.com`,
        dateOfBirth: new Date(),
        phoneNumber: `0123456789${i}`,
        address: `Customer address ${i}`,
        city: `City${i}`,
        gender: 1
      });
    }
    return queryInterface.bulkInsert('Customers', customer, {}).catch(e => Promise.resolve());
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Customers', null, {}),
};
