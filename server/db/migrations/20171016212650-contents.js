/* eslint-disable */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'Contents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      key: {
        type: Sequelize.STRING,
      },
    },
    {
      indexes: [
        // Create a unique index on poem
        {
          unique: true,
          fields: ['key'],
        },
      ],
    }
  ),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Contents'),
};
