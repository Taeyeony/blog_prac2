const Joi = require('joi');


const signupValidation = Joi.object({
  nickname: Joi.string().alphanum().not('').required(),
  password: Joi.string().min(3).not('').required(),
  confirm: Joi.equal(Joi.ref('password')).required().messages({
    'any.only': '비밀번호가 일치하지 않습니다.'
  }),
});

const postCreateValidation = Joi.object({
  title: Joi.string().not('').required(),
  content: Joi.string().not('').required(),
  userId: Joi.number().required(),
});

const postUpdateValidation = Joi.object({
  title: Joi.string().optional().not(''),
  content: Joi.string().optional().not(''),
  userId: Joi.number()
});

module.exports = {
  signupValidation,
  postCreateValidation,
  postUpdateValidation,
};