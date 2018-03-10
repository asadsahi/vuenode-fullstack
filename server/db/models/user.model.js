/* eslint-disable */

const bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        isEmail: true,
        allowNull: false,
        set(value) {
          this.setDataValue('email', value.toLowerCase());
        }
      },
      username: {
        type: DataTypes.STRING,
        // Act as required
        allowNull: false,
        set(value) {
          this.setDataValue('username', value.toLowerCase());
        },
        validate: {
          validateUsername
        }
      },
      password: {
        allowNull: true, // Because of social logins don't have password
        type: DataTypes.STRING
      },
      emailConfirmed: DataTypes.BOOLEAN,
      provider: {
        type: DataTypes.STRING,
        allowNull: false
      },
      profileData: {
        type: DataTypes.STRING,
        set(value) {
          if (value) {
            this.setDataValue('profileData', JSON.stringify(value));
          }
        }
      },
      additionalProvidersData: {
        type: DataTypes.STRING,
        set(value) {
          if (value) {
            this.setDataValue('additionalProvidersData', JSON.stringify(value));
          }
        }
      },
      resetPasswordToken: {
        type: DataTypes.STRING
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
        isDate: true
      }
    },
    {
      indexes: [
        // Create a unique index on poem
        {
          unique: true,
          fields: ['email']
        },
        {
          unique: true,
          fields: ['username']
        }
      ],
      hooks: {
        beforeCreate: user => {
          user.createdAt = new Date();
          user.updatedAt = new Date();
          if (user.provider === 'local') {
            user.password = user.encryptPassword(user.password);
          }
        }
      },
      getterMethods: {
        displayName() {
          return `${this.firstName} ${this.lastName}`;
        },
        roleNames() {
          return this.Roles ? this.Roles.map(r => r.name) : [];
        },
        roles() {
          return this.Roles
            ? this.Roles.map(r => ({ id: r.id, name: r.name }))
            : [];
        },
        isAdmin() {
          return (
            this.Roles && this.Roles.map(r => r.name).indexOf('admin') > -1
          );
        },
        profileImage() {
          return this.UserImage
            ? `api/users/picture/${this.UserImage.id}`
            : undefined;
        }
      }
    }
  );

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.prototype.encryptPassword = function(password) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  };

  User.associate = function(models) {
    User.hasOne(models.UserImage, { foreignKey: 'userid' });
    User.belongsToMany(models.Role, {
      timestamps: false,
      through: 'UserRole',
      foreignKey: 'roleid'
    });
  };

  return User;
};

/**
 * A Validation function for username
 * - at least 3 characters
 * - only a-z0-9_-.
 * - contain at least one alphanumeric character
 * - not in list of illegal usernames
 * - no consecutive dots: "." ok, ".." nope
 * - not begin or end with "."
 */

function validateUsername(username) {
  const usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;
  const result =
    this.provider !== 'local' ||
    (username &&
      usernameRegex.test(username) &&
      appConfig.illegalUsernames.indexOf(username) < 0);

  if (!result) {
    throw new Error('Username is not valid');
  }
}
