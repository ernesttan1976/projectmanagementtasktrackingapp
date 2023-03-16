var express = require('express');
var router = express.Router();
const passport = require('passport');
const usersCtrl = require('../controllers/users');

//Google OAuth Sign In
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}
))

//Google OAuth callback
router.get('/oauth2callback', passport.authenticate('google', {
  successRedirect: '/boards',
  failureRedirect: '/auth/google'
}))

//Logout ALL (Google/Local)
router.post('/auth/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    // req.session.destroy(function (err) {
    //   res.redirect('/');
    // });
    res.redirect('/');
  });
});



module.exports = router;