const User = require('../models/users');
var bcrypt = require('bcrypt');
const Board = require('../models/boards');

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
                res.status(401).send('401 Unauthorised');
            }
            bcrypt.compare(req.body.password, user.password)
                .then(result=>{
                    if (!result){
                        res.status(401).send('401 Unauthorised');
                    } else {
                        res.locals.user = user;
                        req.session.isAuthenticated = true;

                        Board.find()
                            .then(boards => {
                            if (boards.length === 0) {
                                res.redirect('/boards/new');
                            } else {
                                const title = "Select Board";
                                const context = { title, boards, user: res.locals.user};
                                res.render('boards/index', context);
                            }
                            })
                            .catch(err => {
                            console.log(err);
                            })
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
        })
}


function newUser(req,res,next){
    res.render('users/signup');
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
