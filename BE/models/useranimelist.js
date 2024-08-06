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
      UserAnimeList.belongsTo(models.User, {foreignKey: 'id'})
    }
  }
  UserAnimeList.init({
    UserId: DataTypes.INTEGER,
    AnimeId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    title: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    type: DataTypes.STRING,
    animeUrl: DataTypes.STRING,
    notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserAnimeList',
  });
  return UserAnimeList;
};