'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAnimeList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserAnimeList.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  }
  UserAnimeList.init({
    UserId: DataTypes.INTEGER,
    AnimeId: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Watching'
    },
    title: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    type: DataTypes.STRING,
    animeUrl: DataTypes.STRING,
    notes: {
      type: DataTypes.STRING,
      defaultValue: "-",
      allowNull: false,
      validate: {
        notNull: { message: "Notes cannot be left blank"},
        notEmpty: { message: "Notes cannot be left blank"}
      }
    }
  }, {
    sequelize,
    modelName: 'UserAnimeList',
  });
  return UserAnimeList;
};