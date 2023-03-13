const passport = require('passport');
const User = require('../models/users');

passport.serializeUser(function(user,cb){
    cb(null, user._id);
})

passport.deserializeUser(async function(userId,cb){
    cb(null, await User.findById(userId));
})