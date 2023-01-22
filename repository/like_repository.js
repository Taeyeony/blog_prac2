const { Like } = require('../models');

class LikeRepository {

  showLiked = async ( userId ) => {
    const like = await Like.findAll({
          where: {
            userId
          }
        });
        return like;
  };

  likePost = async ( postId, userId ) => {
    try {
      const like = await await Like.findOne({
            where: {
              userId,
              postId,
            },
          });
      const isLikedAlready = !!like;
        if(isLikedAlready) {
          const deletedLike = await Like.destroy({
            where: {
              userId,
              postId,
            },
          });
          return deletedLike;
        } else {
          const postedLike = await Like.create({
            userId,
            postId
          });
          return postedLike;
        }
    } catch (err) {
          res.status(500).json({ message: err.message });
    }              
  };
}

module.exports = LikeRepository;