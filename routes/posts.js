const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const PostController = require('../controller/post_controller.js');
const postController = new PostController();

router.get('/', postController.showPost);
router.get('/:id', postController.showOnePost);
router.post('/', authMiddleware, postController.createPost);
router.patch('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);



// const { Post, User, Like, Sequelize } = require('../models');
// const { 
//   postCreateValidation, 
//   postUpdateValidation, 
// } = require('../validations');


// // 게시글 좋아요, 취소
// router.post('/:id/like', authMiddleware, async (req, res) => {
//   const { id: postId } = req.params;
//   const { 
//     currentUser: { id: userId }, 
//   } = res.locals;

//   try {
//     const like = await Like.findOne({
//       where: {
//         userId,
//         postId,
//       },
//     });

//     const isLikedAlready = !!like;

//     if(isLikedAlready) {
//       const deletedLike = await Like.destroy({
//         where: {
//           userId,
//           postId,
//         },
//       });
//       res.json(deletedLike);
//     } else {
//       const postedLike = await Like.create({
//         userId,
//         postId
//       });
//       res.json(postedLike);
//     }    
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }  
// });


module.exports = router;

