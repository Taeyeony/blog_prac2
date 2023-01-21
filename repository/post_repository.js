const { Post, User, Like, Sequelize } = require('../models');

class PostRepository {
  showPost = async () => {
    const posts = await Post.findAll({
      // attributes: { exclude: ['userId'] },
      attributes: [
        'id',
        'title',
        'content',
        [Sequelize.fn('count', Sequelize.col('likes.id')), 'numOfLikes'], // 좋아요 개수 같이 표출
      ],
      include: [
        ({ model: User, as: 'user', attributes: ['nickname'] }),
        {
          model: Like,
          as: 'likes',
          attributes: [],
        },
      ],     
      group: ['post.id'],
      order: [[Sequelize.literal('numOfLikes'), 'DESC']],  // 좋아요가 많은 순으로 정렬 (반대는 'ASC')   
    });
    return posts;
  };

  showOnePost = async ( id ) => {
    const posts = await Post.findByPk(id, {
      include: ({ model: User, as: 'user', attributes: ['nickname'] }),
      attributes: { exclude: ['userId'] },
  });
  return posts;
  };

  createPost = async ( userId, title, content ) => {
    const newPost = await Post.create({
            title,
            content,
            userId,
          });
          return newPost;
  };

  updatePost = async ( id, nickname, fieldsToBeUpdated ) => {
    const modifyPost = await Post.update(fieldsToBeUpdated, {
          where: { id },
          include: {
            model: User, 
            as: nickname
          }
        });
        return modifyPost;
  };

  deletePost = async ( id, nickname ) => {
    const deletedPost = await Post.destroy({ where: { id },
            include: {
              model: User, 
              as: nickname
            }
          });
          return deletedPost;
  };
}

module.exports = PostRepository;