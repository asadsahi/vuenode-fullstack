/* eslint-disable */

const Model = require('../models').Role;

module.exports = {
  up: (queryInterface, Sequelize) => Model.count().then((count) => {
    if (count < 1) {
      return queryInterface.bulkInsert('Roles', [
        { name: 'admin', description: 'Admin role' },
        { name: 'user', description: 'User role' },
        { name: 'guest', description: 'Guest role' },
      ]);
    }
  }),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {}),
};
