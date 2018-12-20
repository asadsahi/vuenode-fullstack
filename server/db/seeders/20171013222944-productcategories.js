/* eslint-disable */

module.exports = {
  up: (queryInterface, Sequelize) => {
    const categories = [];
    for (let i = 1; i < 11; i++) {
      categories.push({
        name: `Category ${i}`,
        description: `${i} Category description`,
        icon: 'fa fa-tags'
      });
    }
    return queryInterface.bulkInsert('ProductCategories', categories, {}).catch(e => Promise.resolve());
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('ProductCategories', null, {}),
};
