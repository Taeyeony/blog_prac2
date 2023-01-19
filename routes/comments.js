const express = require('express');
const authMiddleware = require('../middleware/auth')

const router = express.Router();
const { Comment, Post, User } = require('../models');
const { 
  commentCreateValidation, 
  commentUpdateValidation 
} = require('../validations');


// 댓글 조회
router.get('/', async (req, res) => {
  try{
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }  
});

// 댓글 상세 조회
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;

  try{
    const post = await Post.findByPk(postId);
    const postComments = await post.getComments();
    res.json(postComments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }  
});

// 댓글 작성
router.post('/:postId', authMiddleware, async (req, res) => {
  const { currentUser } = res.locals;
  const userId = currentUser.id;

  const { postId } = req.params;

  try {
    const { content } = await commentCreateValidation.validateAsync(req.body);
    const comment = await Comment.create({
      content,
      postId,
      userId
    });
    res.json(comment);
  } catch (err) {
    if (err.isJoi) {
      return res.status(422).json({ message: err.details[0].message });
    }
    res.status(500).json({ message: err.message });
  }
});

// 댓글 수정
router.patch('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { currentUser } = res.locals;
  const nickname = currentUser.nickname;

  try{
    const fieldsToUpdate = await commentUpdateValidation.validateAsync(req.body);
    const updatedComment = await Comment.update(fieldsToUpdate, {
      where: { id },
      include: {
        model: User,
        as: nickname
      }
    });
    res.json(updatedComment);
  } catch(err) {
    if (err.isJoi) {
      return res.status(422).json({ message: err.details[0].message });
  }
  res.status(500).json({ message: err.message });
  } 
});

// 댓글 삭제
router.delete('/:id', authMiddleware, async (req, res) => {
  const { currentUser } = res.locals;
  const nickname = currentUser.nickname;

  try {
    const { id } = req.params;
    const deletedComment = await Comment.destroy({ where: { id },
      include: {
        model: User,
        as: nickname
      }
    });
    res.json(deletedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;