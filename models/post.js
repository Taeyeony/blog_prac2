'use strict';
const {
  Model
} = require('sequelize');
const { threadId } = require('worker_threads');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Comment, Like }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      this.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
      this.hasMany(Like, {foreignKey: 'postId', as: 'likes'})
    }
  }
  Post.init({
    title: {
      type:DataTypes.STRING,
      allowNull: false
    },
    content: {
      type:DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type:DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'Post',
  });
  return Post;
};