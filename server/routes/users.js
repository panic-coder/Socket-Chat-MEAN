var express = require('express');
//var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../model/user');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var config = require('../config/database');
var sha256 = require('sha256');
var jwt = require('jsonwebtoken');
var Promise = require('promise');
var observer = require('node-observer');
var chat = require('../model/chat');
mongoose.connect('mongodb://localhost:27017/chat', {useNewUrlParser: true}); 
var db = mongoose.connection;


router.post('/register', (req, res, next) => {
    var newUser = new User({
        email: req.body.email,
        password: req.body.password
    })
    User.addUser(newUser, (err, User) => {
        if (err) {
            res.json({
                success: false,
                msg: "Failed to Register"
            });
        } else {
            res.json({
                success: true,
                msg: "Registered Successfully",
                status_code: 200
            });
        }
    })
})

router.post('/login', (req, res) => {
    var id;
    //var count = 0;
    User.findOne({
        "email": req.body.email
    }, (function (err, doc) {
        //count++;
        if (err) throw err;
        if(doc != null){
            if (doc.password === sha256(req.body.password)) {

                console.log(doc);
    
                //res.json(doc._id);
                id = {
                    id: doc._id
                };
                var token = jwt.sign(
                    id, 'secretKey', {
                        expiresIn: '5h'
                    });
    
                res.send({
                    success: true,
                    token: token,
                    email: doc.email
                })
            }  else {
                res.json({
                    success: false,
                    reason:'Wrong password'
                });
            }

        } else {
            res.json({
                success: false,
                reason:'Invalid Login'
            });
        } 

    }))
})

router.get("/chatdash", function(req, res, next) {
    //console.log('get');
    
    db.collection("userChat").find({}, function(err, docs) {
      if(err) return next(err);
      //console.log(docs);
      var data = [];
      docs.each(function(err, doc) {
        if(doc) {
          //console.log(doc);
            data.push(doc);
         }
         else{
             res.send({message:data});
         }
      })
    });
  });


  var onUser = [];

  router.post("/getOnline", function(req, res) {
      //console.log(req.body.email);
     if(onUser.indexOf(req.body.email) == -1)
        onUser.push(req.body.email);
        console.log(onUser);
        res.send(onUser)
  })

  router.post("/getOffline", function(req, res) {
      //console.log('off'+req.body.email);
      var index = onUser.indexOf(req.body.email);
      onUser.splice(index,1);
      console.log(onUser);
      res.send(onUser)
      
  })
  
router.get('/login', function(req,res,next){

})



//    MongoClient.connect(url, (err, db) => {
//        if(err) throw err;
//         var loop = db.collection('userInfo').find();
//         loop.each(function(err, data){
//             if(err) throw err;
//             console.log(data);
//         })
//    })



// jwtGen = (id) => {
//     jwt.sign({
//         id: id
//     }, 'secretKey', {
//         expiresIn: '1h'
//     }, function (err, token) {
//         if (err) err;
//         res.json({
//             success: true,
//             token: token
//         })
//         return token;
//     })
// }
 //   var response = {
        //         statusCode: 200,
        //         headers:  { 'Content-Type': 'application/json' },
        //         body: JSON.parse(doc)
        //       }

module.exports = router;