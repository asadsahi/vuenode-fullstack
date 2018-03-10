/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserRole', [
      { userid: 1, roleid: 1 },
      { userid: 2, roleid: 2 }
    ]).catch(err => Promise.resolve());
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('UserRole', null, {}),
};
