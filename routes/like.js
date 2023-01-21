const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const LikeController = require('../controller/like_controller');
const likeController = new LikeController();

router.get('/', authMiddleware, likeController.likePost);


module.exports = router;