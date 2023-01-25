const CommentRepository = require('../repository/comment_repository');

class CommentService {
  commentRepository = new CommentRepository();

  showComment = async () => {
      const comments = await this.commentRepository.showComment();
      return comments;
  };

  showOneComment = async ( postId ) => {
    const comments = await this.commentRepository.showOneComment( postId );
    return comments;
  };

  createComment = async ( userId, postId, content ) => {
    const newComment = await this.commentRepository.createComment( 
      userId, 
      postId, 
      content 
      );
    return newComment;
  };

  updateComment = async ( nickname, id, fieldsToBeUpdated ) => {
    const modifyComment = await this.commentRepository.updateComment( 
      nickname, 
      id, 
      fieldsToBeUpdated 
      );
    return modifyComment;
  };

  deleteComment = async (id, nickname) => {
    const deletedComment = await this.commentRepository.deleteComment(
      id,
      nickname
    );
    return deletedComment;
  }
  
}

module.exports = CommentService;