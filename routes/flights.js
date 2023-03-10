var express = require('express');
var router = express.Router();
var flightsCtrl = require('../controllers/flights');


//Index-Get
router.get('/', flightsCtrl.index);
//New-Get
router.get('/new', flightsCtrl.new);
//Show-Get
router.get('/:id', flightsCtrl.show);
//Create-Post
router.post('/', flightsCtrl.create);
//Destination Create-Post
router.post('/:id/destinations', flightsCtrl.createDestination);
//Destination Delete
router.delete('/:id/destinations/:destid', flightsCtrl.deleteDestination);

module.exports = router;
