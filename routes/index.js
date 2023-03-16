var express = require('express');
var router = express.Router();
const passport = require('passport');
const usersCtrl = require('../controllers/users');


router.get('/', function (req, res, next) {
  if (res.locals.user){
    res.redirect('/boards');
  } else {
    res.locals ={
      title: "Welcome to Task Tracker, please sign in",
      user: "",
    }
    res.render('home', res.locals);
  }
});

module.exports = router;

