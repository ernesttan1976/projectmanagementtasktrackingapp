var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users');

//Login
router.get('/login', usersCtrl.getLoginUser);
//Login User POST: /users/login
router.post('/login', usersCtrl.loginUser);

//Register
router.get('/signup', usersCtrl.newUser);
//Create User POST: /users
router.post('/', usersCtrl.createUser);


module.exports = router;
