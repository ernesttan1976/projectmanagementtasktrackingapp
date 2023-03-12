const User = require('../models/users');
var bcrypt = require('bcrypt');

module.exports = {
  newUser,
  createUser,
  getLoginUser,
  loginUser
};

function getLoginUser(req,res,next){
    res.render('users/login');
}

function loginUser(req,res,next){
    User.findOne({email: req.body.email})
        .then(user=>{
            if (!user){
                res.send(401,'401 Unauthorised');
            }
            bcrypt.compare(req.body.password, user.password)
                .then(result=>{
                    console.log(result);
                    if (!result){
                        res.send(401,'401 Unauthorised');
                    } else {
                        res.redirect('/boards');
                    }
                })
                .catch(err=>{
                    res.send(next);
                })
        })
}


function newUser(req,res,next){
    res.render('users/signup');
}

function createUser(req,res,next){
  bcrypt.hash(req.body.password, 10)
    .then(hash=>
        ({
            name: req.body.name,
            email: req.body.email,
            password: hash,
        })
    )
    .then(user=>User.create(user))
    .then(user=>res.status(201).json(user))
    .catch(next);
}
