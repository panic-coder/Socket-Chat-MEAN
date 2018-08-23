var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../model/user');
var jwt = require('jsonwebtoken');
var sha256 = require('sha256');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
mongoose.connect(config.database, {useNewUrlParser: true}); 
var db = mongoose.connection;

/**
 * Register API
 */
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

/**
 * Login API
 */
router.post('/login', (req, res) => {
    var id;
    User.findOne({
        "email": req.body.email
    }, (function (err, doc) {
        if (err) throw err;
        if(doc != null){
            if (doc.password === sha256(req.body.password)) {
                console.log(doc);
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

/**
 * API for pushing messages into database
 */
router.get("/chatdash", function(req, res, next) {
    db.collection("userChat").find({}, function(err, docs) {
      if(err) return next(err);
      var data = [];
      docs.each(function(err, doc) {
        if(doc) {
            data.push(doc);
         }
         else{
             res.send({message:data});
         }
      })
    });
  });


module.exports = router; //Getting all the routes available in exports module