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

var User = module.exports = mongoose.model('user', UserSchema);

module.exports.addUser = (newUser, callback) => {
    newUser.password = sha256(newUser.password);
    newUser.save(callback);
}


module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

module.exports.getUserByEmail = (email, callback) => {
    var query = {email: email}
    User.findOne(query, callback);
}

module.exports.comparePassword = (userPassword, hash, callback) => {
    bcrypt.compare(userPassword, hash, (err, match) => {
        if(err) throw err;
        callback(null, match);
    })
}