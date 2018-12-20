/* eslint-disable */

module.exports = function (sequelize, DataTypes) {
    const Customer = sequelize.define(
        'Customers', {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            dateOfBirth: DataTypes.DATE,
            phoneNumber: DataTypes.STRING,
            address: DataTypes.STRING,
            city: DataTypes.STRING,
            gender: DataTypes.ENUM(0, 1, 2), // None, Female, Male
        },
        {
            timestamps: false,
        }
    );

    return Customer;
};
