var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');

router.get('/:userId/edit', usersCtrl.editUser);

router.put('/:userId', usersCtrl.updateUser);

module.exports = router;

