var express = require('express');
//var app = express();
var router = express.Router();

var User = require('../model/user');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var config = require('../config/database');
var sha256 = require('sha256');
var jwt = require('jsonwebtoken');
var Promise = require('promise');
var observer = require('node-observer');

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
    User.findOne({
        "email": req.body.email
    }, (function (err, doc) {

        if (err) throw err;
        if(doc != null){
            if (doc.password === sha256(req.body.password)) {

                console.log(doc);
    
                //res.json(doc._id);
                id = {
                    id: doc._id
                };
    
                //res.json('before token');
                // var jwt = jwtGen(id);
                // res.json(jwt);
                var token = jwt.sign(
                    id, 'secretKey', {
                        expiresIn: '1h'
                    });
    
                res.send({
                    success: true,
                    token: token
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

module.exports = router;