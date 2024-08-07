'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../utils/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.UserAnimeList, { foreignKey: 'UserId' })
    }
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'UserName already taken'
      },
      validate: {
        notEmpty: { msg: 'UserName is required' },
        notNull: { msg: 'UserName is required' },
        len: {
          args: [5, 12],
          msg: 'UserName must be between 5 and 12 characters long'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already taken'
      },
      validate: {
        isEmail: { msg: 'Must be in email format' },
        notEmpty: { msg: 'Email is required' },
        notNull: { msg: 'Email is required' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Password is required' },
        notNull: { msg: 'Password is required' },
        len: {
          args: [6, 24],
          msg: 'Password must be between 5 and 12 characters long'
        }
      }
    },
    GoogleId: DataTypes.STRING,
    gender: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', (user, opt) => {
    user.password = hashPassword(user.password)
  })

  return User;
};