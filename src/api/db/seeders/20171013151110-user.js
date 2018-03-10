const Model = require('../models').User;

const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: (queryInterface, Sequelize) =>
    Model.count().then(count => {
      if (count < 1) {
        const salt = bcrypt.genSaltSync();
        return queryInterface.bulkInsert('Users', [
          {
            email: 'admin@admin.com',
            username: 'admin',
            firstName: 'Admin',
            lastName: 'Admin',
            password: bcrypt.hashSync('P@ssw0rd!', salt),
            provider: 'local',
            emailConfirmed: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            email: 'user@user.com',
            username: 'user',
            firstName: 'User',
            lastName: 'User',
            emailConfirmed: true,
            password: bcrypt.hashSync('P@ssw0rd!', salt),
            provider: 'local',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]);
      }
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null, {})
};
