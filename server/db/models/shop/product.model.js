/* eslint-disable */

module.exports = function (sequelize, DataTypes) {
    const Product = sequelize.define(
        'Products', {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            icon: DataTypes.STRING,
            buyingPrice: DataTypes.INTEGER,
            sellingPrice: DataTypes.INTEGER,
            unitsInStock: DataTypes.INTEGER,
            isActive: DataTypes.BOOLEAN,
            isDiscontinued: DataTypes.BOOLEAN,
            categoryId: DataTypes.INTEGER
        },
        {
            timestamps: false,
        }
    );

    Product.associate = models => {
        Product.belongsTo(models.ProductCategories, { foreignKey: 'categoryId' });
    };

    return Product;
};
