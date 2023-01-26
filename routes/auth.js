
const express = require('express');
const router = express.Router();

const AuthController = require('../controller/auth_controller');
const authController = new AuthController();

const authMiddleware = require('../middleware/auth');


router.get('/', authController.showUser);
router.post('/signup', authController.createUser);
router.post('/login', authController.loginUser);
router.delete('/', authMiddleware, authController.deleteUser);




module.exports = router;