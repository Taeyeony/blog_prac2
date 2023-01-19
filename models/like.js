'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post, Like }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      this.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
      this.hasMany(Like, {foreignKey: 'postId', as: 'likes' });
    }
  }
  like.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    postId: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'likes',
    modelName: 'Like',
  });
  return like;
};