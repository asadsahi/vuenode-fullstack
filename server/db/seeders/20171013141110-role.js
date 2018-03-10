/* eslint-disable */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
        { id: 1, name: 'admin', description: 'Admin role' },
        { id: 2, name: 'user', description: 'User role' },
        { id: 3, name: 'guest', description: 'Guest role' }
    ]).catch(e => Promise.resolve())
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {}),
};
