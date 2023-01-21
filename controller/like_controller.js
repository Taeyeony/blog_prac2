const LikeService = require('../service/like_service');

class LikeController {
  likeService = new LikeService();

  likePost = async (req, res) => {
    const { 
          currentUser: { id: userId }, 
        } = res.locals;
        console.log( `userId ${userId}`)
    try {
      const like = await this.likeService.likePost( userId );
      res.json(like);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = LikeController;