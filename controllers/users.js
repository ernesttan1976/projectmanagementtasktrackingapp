const User = require('../models/users');

module.exports = {
  editUser,
  updateUser,
};

function editUser(req, res) {
    console.log('userfindbyid:' ,req.params.userId);
    User.findById(req.params.userId)
        .then(user=>{
            console.log(user);
            res.locals = {
                title: "Edit User Profile",
                user: res.locals.user,
                userData: user,
            }
            res.render('users/edit', res.locals);        
        })
        .catch(err=>{
            console.log(err);
        })
}

function updateUser(req, res) {
    User.findByIdAndUpdate(req.params.userId, req.body)
        .then(result=>{
            res.redirect('/boards');
        })
        .catch(err=>{
            console.log(err);
        });
}
