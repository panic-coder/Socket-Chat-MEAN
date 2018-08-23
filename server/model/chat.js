var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var user = require('./user');

/**
 * Schema for message
 */
var MessageSchema = new mongoose.Schema({
    id: {
        type: String
    },
    email:{
        type: String
    },
    message: {
        type: String
    },
    timeStamp: {
         type : Date, default: Date.now() 
    }
},{ collection: 'userChat'})

var Chat = module.exports = mongoose.model('chat', MessageSchema );

/**
 * Getting id via token
 * @param {String} token 
 * @param {String} msg 
 */
module.exports.getTokenValue = (token, msg) => {
      var decoded = jwt.verify(token, 'secretKey');
      var chat = new Chat({
          id: decoded.id,
          message: msg
      })
      user.getEmailById(decoded.id, chat);
}
