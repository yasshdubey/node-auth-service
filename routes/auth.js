var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/authController')


router.post('/login', AuthController.login)
// router.get('/logout', AuthController.logout)
router.post('/register', AuthController.register)


module.exports = router;
