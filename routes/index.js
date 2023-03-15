var express = require('express');
var router = express.Router();
const passport = require('passport');
const usersCtrl = require('../controllers/users');


router.get('/', function (req, res, next) {
  //res.redirect('/login');
  res.redirect('/boards');
});


//Google OAuth Sign In
// router.get('/auth/google', passport.authenticate('google', {
//   scope: ['profile', 'email'],
// }
// ))

//Google OAuth callback
// router.get('/oauth2callback', passport.authenticate('google', {
//   successRedirect: '/boards',
//   failureRedirect: '/auth/google'
// }))

//Logout ALL (Google/Local)
// router.post('/logout', function(req, res, next){
//   req.logout(function(err) {
//     if (err) { return next(err); }
//     // req.session.destroy(function (err) {
//     //   res.redirect('/');
//     // });
//     res.redirect('/login');
//   });
// });

// //Login Local GET: /login
// router.get('/login', usersCtrl.getLoginUser);
// //Login Local POST: /login
// router.post('/login', usersCtrl.loginUser);

// //Sign up Local GET: /signup
// router.get('/signup', usersCtrl.newUser);
// //Create User Local POST: /signup
// router.post('/signup', usersCtrl.createUser);



module.exports = router;

