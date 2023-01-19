const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const { Post, User } = require('../models');
const { 
  postCreateValidation, 
  postUpdateValidation, 
} = require('../validations');

// 게시글 조회
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: ({ model: User, as: 'user', attributes: ['nickname'] }),
      attributes: { exclude: ['userId'] },
    });
    res.json(posts); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

// 게시글 상세 조회
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id, {
      include: ({ model: User, as: 'user', attributes: ['nickname'] }),
      attributes: { exclude: ['userId'] },
    });

    res.json(post);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }

});


// 게시글 생성
router.post('/', authMiddleware, async (req, res) => {
  const { currentUser } = res.locals;
  const userId = currentUser.id;
  try {
    const { title, content } = await postCreateValidation.validateAsync(
      req.body
    );
    const post = await Post.create({
      title,
      content,
      userId,
    });
    res.json(post);
  } catch(err) {
    if (err.isJoi) {
      return res.status(422).json({ message: err.details[0].message });
    }
  }
})

// 게시글 수정
router.patch('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { currentUser } = res.locals;
  const nickname = currentUser.nickname;

  try {
    const fieldsToBeUdated = await postUpdateValidation.validateAsync(
      req.body
    );
  const updatedPost = await Post.update(fieldsToBeUdated, {
    where: { id },
    include: {
      model: User, 
      as: nickname
    }
  });
  res.json(updatedPost);
  }catch(err) {
    if (err.isJoi) {
      return res.status(422).json({ message: err.details[0].message });
    }
    res.status(500).json({ message: err.message });
  }
});

// 게시글 삭제
router.delete('/:id', authMiddleware, async (req, res) => {
  const { currentUser } = res.locals;
  const nickname = currentUser.nickname;
  try {
    const { id } = req.params;
    const deletePost = await Post.destroy({ where: { id },
      include: {
        model: User, 
        as: nickname
      }
    });
    res.json(deletePost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }  
});

module.exports = router;

