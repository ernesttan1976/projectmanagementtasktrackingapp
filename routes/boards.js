var express = require('express');
var router = express.Router();
var boardsCtrl = require('../controllers/boards');


//Index-Get
router.get('/', boardsCtrl.show);

module.exports = router;
