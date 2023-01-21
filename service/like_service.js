const LikeRepository = require('../repository/like_repository');

class LikeService {
  likeRepository = new LikeRepository();
  
  likePost = async ( userId ) => {
    const like = await this.likeRepository.likePost( userId );
    console.log(like)
    return like;
  }
}

module.exports = LikeService;