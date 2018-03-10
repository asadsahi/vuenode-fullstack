const sequelize = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize
      .query('select * from "UserRole"', {})
      .then(count => {
        if (!count[0][0]) {
          return queryInterface.bulkInsert('UserRole', [
            { userid: 1, roleid: 1 },
            { userid: 2, roleid: 2 }
          ]);
        }
      }),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('UserRole', null, {})
};
