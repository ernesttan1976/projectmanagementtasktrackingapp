var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect('/users/signup');
  //res.redirect('/boards');
});

module.exports = router;
