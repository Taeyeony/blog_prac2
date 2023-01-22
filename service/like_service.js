const LikeRepository = require('../repository/like_repository');

class LikeService {
  likeRepository = new LikeRepository();
  
  showLiked = async ( userId ) => {
    const like = await this.likeRepository.showLiked( userId );
    return like;
  };
  
  likePost = async ( postId, userId ) => {
    const like = await this.likeRepository.likePost( postId, userId );
    return like;
  };
}

module.exports = LikeService;