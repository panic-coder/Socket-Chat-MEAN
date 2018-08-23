var mongoose = require('mongoose');
var sha256 = require('sha256');

/**
 * User Data Schema
 */
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

/**
 * Adding hashed password in the user schema
 * @param {Object} newUser 
 * @param {*} callback 
 */
module.exports.addUser = (newUser, callback) => {
    newUser.password = sha256(newUser.password);
    newUser.save(callback);
}

/**
 * Getting email by id of an object
 * @param {String} id 
 * @param {String} chat 
 */
module.exports.getEmailById = (id, chat) =>{
    User.findById(id, function (err, user) {
        chat.email = user.email;
        chat.save();
        
      });
}