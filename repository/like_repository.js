const { Like } = require('../models');

class LikeRepository {

  likePost = async ( userId ) => {
    const like = await Like.findAll({
          where: {
            userId
          }
        });
        console.log(like)
        return like;
  }
}

module.exports = LikeRepository;