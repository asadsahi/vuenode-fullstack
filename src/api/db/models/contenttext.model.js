
/* eslint-disable */
module.exports = function (sequelize, DataTypes) {
  const ContentText = sequelize.define(
    'ContentText', {
      text: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );

  ContentText.associate = function (models) {
    ContentText.belongsTo(models.Language, { foreignKey: 'languageid' });
    ContentText.belongsTo(models.Content, { foreignKey: 'contentid' });
  };

  return ContentText;
};
