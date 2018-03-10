module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('ContentTexts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING
      },
      languageid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Languages',
          key: 'id'
        }
      },
      contentid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Contents',
          key: 'id'
        }
      }
    }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('ContentTexts')
};
