var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', function(req, res, next) {
  res.redirect('/users/login');
  //res.redirect('/boards');
});

//A route to handle the request sent when the user clicks Login with Google
router.get('/auth/google', passport.authenticate('google',{
  scope: ['profile','email'],
}
))

//The /oauth2callback route that we told Google to call after the user confirms or denies the OAuth login.
router.get('/oauth2callback', passport.authenticate('google', {
    successRedirect: '/boards',
    failureRedirect: '/auth/google'
}))

//Route for the user to logout.
router.get('/logout', function(req,res){
  req.logout(function(){
    res.redirect('/');
  })
})

module.exports = router;

