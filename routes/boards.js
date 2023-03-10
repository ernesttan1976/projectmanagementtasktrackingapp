var express = require('express');
var router = express.Router();
var flightsCtrl = require('../controllers/flights');


//Index-Get
router.get('/', flightsCtrl.index);


module.exports = router;
