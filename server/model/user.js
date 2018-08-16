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
