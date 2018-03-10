/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Contents', [
    { key: 'app_title' },
    { key: 'app_description' },
    { key: 'app_repo_url' },
    { key: 'app_nav_home' },
    { key: 'app_nav_about' },
    { key: 'app_nav_login' },
    { key: 'app_nav_logout' },
    { key: 'app_nav_register' },
    { key: 'app_nav_admin' },
    { key: 'app_nav_examples' },
  ], {}).catch((e) => Promise.resolve()),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Contents', null, {}),
};
