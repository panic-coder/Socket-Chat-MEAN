var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('../config/database');
var sha256 = require('sha256');

var UserSchema = new mongoose.Schema({
    email: {
        type:  String,
        required: true
   
    },
        
    password: {
       type: String,
       required: true
    
    }
        
}, {collection: 'userInfo'})

var User = module.exports = mongoose.model('User', UserSchema );

module.exports.addUser = (newUser, callback) => {
    //console.log(newUser);
    newUser.password = sha256(newUser.password);
    newUser.save(callback);
}

module.exports.getEmailById = (id, chat) =>{
    User.findById(id, function (err, user) {
       // if (err) return res.status(500).send("There was a problem finding the user.");
        //if (!user) return res.status(404).send("No user found.");
        //console.log(user.email);
        chat.email = user.email;
        chat.save();
        
      });
}