module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      'UserRole',
      {
        userid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Roles',
            key: 'id'
          }
        },
        roleid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          }
        }
      },
      {
        uniqueKeys: {
          user_id_role_id: {
            fields: ['userid', 'roleid']
          }
        }
      }
    ),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('UserRole')
};
