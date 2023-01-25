const { Comment, Post, User } = require('../models');

class CommentRepository {

  showComment = async () => {    
      try {
        const comments = await Comment.findAll();
        return comments;
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    };

  showOneComment = async ( postId ) => {
        try{
      const comments = await Post.findByPk( postId );
      const postComments = await comments.getComments();
      return postComments;
    } catch (err) {
      res.status(500).json({ message: err.message });
    }  
  };
  
  createComment = async ( userId, postId, content ) => {
    const newComment = await Comment.create ({
      postId,
      userId,
      content
    });
    return newComment;
  };

  updateComment = async ( nickname, id, fieldsToBeUpdated ) => {
      const modifyComment = await Comment.update(fieldsToBeUpdated, {
      where: { id },
      include: {
        model: User,
        as: nickname
      }
    });
    return modifyComment;    
  };

  deleteComment = async ( id, nickname ) => {
    const deletedComment = await Comment.destroy({ where: { id },
            include: {
              model: User,
              as: nickname
            }
          });
          return deletedComment;
  };

}


module.exports = CommentRepository;