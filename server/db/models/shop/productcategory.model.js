/* eslint-disable */

module.exports = function (sequelize, DataTypes) {
    const ProductCategory = sequelize.define(
        'ProductCategories', {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            icon: DataTypes.STRING,
        },
        {
            timestamps: false,
        }
    );

    return ProductCategory;
};
