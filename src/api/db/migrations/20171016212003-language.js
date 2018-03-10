module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Languages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      locale: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: Sequelize.STRING
    }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Languages')
};
