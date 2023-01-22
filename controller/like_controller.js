const LikeService = require('../service/like_service');

class LikeController {
  likeService = new LikeService();
  
  // 내가 좋아요한 게시글 조회
  showLiked = async (req, res) => {
    const { 
          currentUser: { id: userId }, 
        } = res.locals;
    try {
      const like = await this.likeService.showLiked( userId );
      res.json(like);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  // 게시글 좋아요, 취소
  likePost = async (req, res) => {
    const { id: postId } = req.params;
    const  { 
      currentUser : {id: userId},
    } = res.locals;

    try {
      const like = await this.likeService.likePost( postId, userId );
      res.json(like);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

module.exports = LikeController;