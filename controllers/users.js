const User = require('../models/users');
const Board = require('../models/boards');
const passport = require('passport');

module.exports = {
  newUser,
  createUser,
  getLoginUser,
  loginUser
};

function getLoginUser(req,res,next){
    res.render('login');
}

function loginUser(req,res,next){
    passport.authenticate('local', { successRedirect: '/boards/all', failureRedirect: '/login' });
}


function newUser(req,res,next){
    res.render('signup');
}

function createUser(req,res,next){
  bcrypt.hash(req.body.password, 10)
    .then(hash=>{
        user = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
        };
        return user;
        }
    )
    .then(user=>{
        User.findOne({email: req.body.email})
         .then(found=>{
            if (!found){

                User.create(user)
                .then(user=>{
                    res.locals.user = user;
                    res.redirect('/boards');
                })
            } else {
                res.status('200'),send('User already exists, please log in');
            }
        
         })
    })
    .catch(err=>{
        console.log(err);
        res.send(403, 'Failed to create user, try again')
    });
}
