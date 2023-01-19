const express = require('express');

const authMiddleware = require('../middleware/auth');

const router = express.Router();
const { Post, User, Like, Sequelize } = require('../models');
const { 
  postCreateValidation, 
  postUpdateValidation, 
} = require('../validations');

// 게시글 조회
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      // attributes: { exclude: ['userId'] },
      attributes: [
        'id',
        'title',
        'content',
        [Sequelize.fn('count', Sequelize.col('likes.id')), 'numOfLikes'], // 좋아요 갯수 같이 표출
      ],
      include: [
        ({ model: User, as: 'user', attributes: ['nickname'] }),
        {
          model: Like,
          as: 'likes',
          attributes: [],
        },
      ],     
      group: ['post.id'],
      order: [[Sequelize.literal('numOfLikes'), 'DESC']],  // 좋아요가 많은 순으로 정렬 (반대는 'ASC')   
    });
    res.json(posts); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

// 내가 좋아요한 게시글 조회
router.get('/mylike', authMiddleware, async(_, res) => {
  const { 
    currentUser: { id: userId }, 
  } = res.locals;

  const like = await Like.findAll({
    where: {
      userId,
    }
  });
  res.json(like);
});

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

// 게시글 좋아요, 취소
router.post('/:id/like', authMiddleware, async (req, res) => {
  const { id: postId } = req.params;
  const { 
    currentUser: { id: userId }, 
  } = res.locals;

  try {
    const like = await Like.findOne({
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
      res.json(deletedLike);
    } else {
      const postedLike = await Like.create({
        userId,
        postId
      });
      res.json(postedLike);
    }    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }  
});

module.exports = router;

