const Joi = require('joi');

// 회원가입
const signupValidation = Joi.object({
  nickname: Joi.string().alphanum().not('').required(),
  password: Joi.string().min(3).not('').required(),
  confirm: Joi.equal(Joi.ref('password')).required().messages({
    'any.only': '비밀번호가 일치하지 않습니다.'
  }),
});

// 게시글 생성
const postCreateValidation = Joi.object({
  title: Joi.string().not('').required(),
  content: Joi.string().not('').required(),
  userId: Joi.forbidden(),
});

// 게시글 수정
const postUpdateValidation = Joi.object({
  title: Joi.string().optional().not(''),
  content: Joi.string().optional().not(''),
  userId: Joi.forbidden()
});

// 댓글 생성
const commentCreateValidation = Joi.object({
  content: Joi.string().not('').required(),
  userId: Joi.forbidden(),
  postId: Joi.forbidden()
});

// 댓글 수정
const commentUpdateValidation = Joi.object({
  content: Joi.string().not(''),
});

module.exports = {
  signupValidation,
  postCreateValidation,
  postUpdateValidation,
  commentCreateValidation,
  commentUpdateValidation,
};