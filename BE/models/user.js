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
      User.hasMany(models.UserAnimeList, {foreignKey: 'UserId'})
    }
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        message: 'UserName already taken'
      },
      validate: {
        notEmpty: { message: 'UserName is required' },
        notNull: { message: 'UserName is required' },
        len: {
          args: [5, 12],
          message: 'UserName must be between 5 and 12 characters long'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        message: 'Email already taken'
      },
      validate: {
        notEmpty: { message: 'Email is required' },
        notNull: { message: 'Email is required' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { message: 'Password is required' },
        notNull: { message: 'Password is required' },
        len: {
          args: [6, 24],
          message: 'Password must be between 5 and 12 characters long'
        }
      }
    },
    GoogleToken: DataTypes.STRING,
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