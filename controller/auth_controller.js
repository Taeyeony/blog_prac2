const AuthService = require('../service/auth_service');

require('dotenv').config();


const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

const { signupValidation } = require('../validations');

class AuthController {
  authService = new AuthService();
// 사용자 조회
  showUser = async (req, res) => {
    try {
      const users = await this.authService.showUser();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }   
  };
// 회원가입
  createUser = async (req, res) => {
    try {
      const { nickname, password } = await signupValidation.validateAsync(req.body);
      const newUser = await this.authService.createUser( nickname, password );
      res.json(newUser);
    } catch (err) {
        if (err.isJoi) {
          return res.status(422).json({ message: err.details[0].message });
        }
        res.status(500).json({ message: err.message });
    }
  };
// 로그인
  loginUser = async (req, res) => {
    const { nickname, password } = req.body;
    try {
      await this.authService.loginUser( nickname, password );
      res.json({ token: jwt.sign({ nickname }, JWT_SECRET_KEY) });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

}



module.exports = AuthController