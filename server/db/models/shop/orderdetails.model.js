/* eslint-disable */

module.exports = function (sequelize, DataTypes) {
    const OrderDetails = sequelize.define(
        'OrderDetails', {
            unitPrice: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            discount: DataTypes.INTEGER,
            orderId: DataTypes.INTEGER,
        },
        {
            timestamps: false,
        }
    );

    OrderDetails.associate = models => {
        OrderDetails.belongsTo(models.Orders, { foreignKey: 'orderId' });
    };

    return OrderDetails;
};
