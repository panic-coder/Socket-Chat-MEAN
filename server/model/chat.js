var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var user = require('./user');

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

module.exports.getTokenValue = (token, msg) => {
      var decoded = jwt.verify(token, 'secretKey');
      //console.log(decoded.id)
      //console.log(' userId '+user.getEmailById(decoded.id));
      
      var chat = new Chat({
          id: decoded.id,
          //email: user.getEmailById(decoded.id),
          message: msg
      })
      user.getEmailById(decoded.id, chat);
       //console.log(chat.email);
      
       
      //chat.save();
        
      // Fetch the user by id 
      // User.findOne({_id: userId}).then(function(user){
      //     // Do something with the user
      //     return res.send(200);
      // });
}
