
const express = require('express');
const router = express.Router();

const AuthController = require('../controller/auth_controller');
const authController = new AuthController();

router.get('/', authController.showUser);
router.post('/signup', authController.createUser);
router.post('/login', authController.loginUser);

module.exports = router;