const AuthRepository = require('../repository/auth_repository');

const bcrypt = require('bcrypt');

class AuthService {
  authRepository = new AuthRepository();

  showUser = async () => {
    const users = await this.authRepository.showUser();
    return users;
  };

  createUser = async ( nickname, password ) => {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await this.authRepository.createUser( nickname, hashedPassword );
    return newUser;
  };

  loginUser = async ( nickname, password ) => {    
    const user = await this.authRepository.loginUser( nickname );
    const isPasswordCorrect = await bcrypt.compare( password, user.password );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ message: '이메일 또는 비밀번호가 틀렸습니다.' });
    }
    return        
  }


}

module.exports = AuthService;