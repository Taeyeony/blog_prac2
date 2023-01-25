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


module.exports = router;

