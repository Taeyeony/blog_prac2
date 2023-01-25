const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const CommentController = require('../controller/comment_controller');
const commentController = new CommentController();

router.get('/', commentController.showComment);
router.get('/:id', commentController.showOneComment);
router.post('/:id', authMiddleware, commentController.createComment);
router.patch('/:id', authMiddleware, commentController.updateComment);
router.delete('/:id', authMiddleware, commentController.deleteComment);


module.exports = router;