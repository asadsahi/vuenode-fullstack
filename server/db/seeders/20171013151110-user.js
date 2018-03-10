/* eslint-disable */
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const salt = bcrypt.genSaltSync();
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
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
        id: 2,
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
    ]).catch(e => Promise.resolve());
  },

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null, {})
};
