const express = require('express');

const postRouter = require('./posts');
const commentRouter = require('./comments');
const authRouter = require('./auth');
const likeRouter = require('./like');

const router = express.Router();

router.use('/posts', postRouter);
router.use('/likes', likeRouter);
router.use('/comments', commentRouter);
router.use('/users', authRouter);




module.exports = router;