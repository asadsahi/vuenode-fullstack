
/* eslint-disable */

module.exports = function (sequelize, DataTypes) {
  const Language = sequelize.define(
    'Language', {
      locale: {
        type: DataTypes.STRING,
        allowNulls: false,
      },
      description: DataTypes.STRING,
    },
    {
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['locale'],
        },
      ],
    }
  );

  return Language;
};
