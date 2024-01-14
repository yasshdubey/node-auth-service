var express = require('express');
const logger = require('../config/logger');
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authentication');
// const logger = require('bcrypt');
var router = express.Router();

/* GET users listing. */
router.get('/', authenticateToken, userController.getUserList);

// router.post('/', async function (req, res, next) {
//   // const insert = req.
//   const { name, username, password } = req.body;

//   try {

//     // const uniqueUser = await User.findOne({where});
//     const exists = await User.count({ where: { username } });

//     if (exists) {
//       return res.status(500).json({ status: "failed", error: 'username taken.' });
//     }

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     const insert = {
//       name,
//       username,
//       password: hashedPassword
//     }

//     const userCreated = await User.create(insert);

//     return res.status(201).json({ status: "success", message: 'User registered successfully.', data: userCreated });
//   } catch (err) {
//     // console.error('Error registering user:', err);
//     logger.log('error', err);
//     return res.status(500).json({ status: "failed", error: 'Failed to register user.' });
//   }
// });

module.exports = router;
