/* eslint-disable */

module.exports = function (sequelize, DataTypes) {
    const Order = sequelize.define(
        'Orders', {
            discount: DataTypes.INTEGER,
            comments: DataTypes.STRING,
            customerId: DataTypes.INTEGER,
            productId: DataTypes.INTEGER,
        },
        {
            timestamps: false,
        }
    );

    Order.associate = models => {
        Order.belongsTo(models.Customers, { foreignKey: 'customerId' });
        Order.belongsTo(models.Products, { foreignKey: 'productId' });
    };

    return Order;
};
