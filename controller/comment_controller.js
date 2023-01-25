const CommentService = require('../service/comment_service');

const { 
  commentCreateValidation, 
  commentUpdateValidation 
} = require('../validations');

class CommentController {
  commentService = new CommentService();
// 댓글 조회
  showComment = async (req, res) => {
    try {
      const comments = await this.commentService.showComment();
      res.json(comments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
// 댓글 상세 조회
  showOneComment = async (req, res) => {
    const { id: postId } = req.params;
    try {
      const comments = await this.commentService.showOneComment( postId );
      res.json(comments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// 댓글 작성
  createComment = async (req, res) => {
    const { currentUser } = res.locals;
    const userId = currentUser.id;
    const { id: postId } = req.params;

    try {
      const { content } = await commentCreateValidation.validateAsync(req.body); 
      const newComment = await this.commentService.createComment( userId, postId, content );
      res.json(newComment);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// 댓글 수정
  updateComment = async (req, res) => {
    const { currentUser } = res.locals;
    const nickname = currentUser.nickname;
    const { id } = req.params;
    const fieldsToBeUpdated = await commentUpdateValidation.validateAsync(req.body);

    try {      
      const modifyComment = await this.commentService.updateComment( 
        nickname, 
        id, 
        fieldsToBeUpdated 
        );
      res.json(modifyComment);
    } catch (err) {
      if (err.isJoi) {
        return res.status(422).json({ message: err.details[0].message });
        }
        res.status(500).json({ message: err.message });
    }
  };

// 댓글 삭제
deleteComment = async (req, res) => {
  const { id } = req.params;
  const { currentUser } = res.locals;
  const nickname = currentUser.nickname;

  try {
    const deletedComment = await this.commentService.deleteComment(
      id,
      nickname
    );
    res.json(deletedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
  
}


module.exports = CommentController;