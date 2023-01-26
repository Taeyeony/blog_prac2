const { User } = require('../models');

class AuthRepository {

  showUser = async () => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
      });
      return users;
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  createUser = async ( nickname, hashedPassword ) => {
    const newUser = await User.create({
            nickname,
            password: hashedPassword
          });
          return newUser;
  };

  loginUser = async ( nickname ) => {
    const user = await User.findOne({ where: {nickname} });
    return user;
  };

  deleteUser = async ( nickname ) => {
    const deletedUser = await User.destroy({ where: { nickname } });
    return deletedUser;
  };

}


module.exports = AuthRepository;