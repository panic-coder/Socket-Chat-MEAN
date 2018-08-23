var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var config = require('./config/database');
var cors = require('cors');
var http = require('http');
var server = http.Server(app);
var socketIO = require('socket.io');
var io = socketIO(server);
var chat = require('./model/chat');

/**
 * Connecting of database 
 */
mongoose.connect(config.database, {useNewUrlParser: true});
var database = mongoose.connection

/**
 * Checking if the front end is connected or not
 */
app.get('/', function(req, res){
    res.send('Connected');
});

/**
 * Checking if the database connection is on or not
 */
mongoose.connection.on('connection', () => {
    console.log('Connected to database ' + config.database);
    
})

/**
 * Checking if there is any error in database connection
 */
mongoose.connection.on('error', (err) => {
    console.log('Error ' + err);
    
})


app.use(cors()); //Cross Origin Resource Sharing

var onUser = []; //Array of online users
var users = require('./routes/users'); //Requires the route page
app.use(bodyParser.json()); //Parsing the body into json format
app.use('/', users); //Getting the page where all the routes are there

/**
 * Socket communication
 */
io.on('connection', function(socket){
    console.log('a user connected');

    /**
     * Displays if the user is disconnected
     */
    socket.on('disconnect', function(){
        console.log('a user disconnected');
    })

    /**
     * Connection to broadcast message
     */
    socket.on('new-message', (message, token, email) => {
        chat.getTokenValue(token,message);
        io.emit('new-message',message,email);
      });

    /**
     * Connection to broadcast online user
     */
    socket.on('on-user', (user) => {
        if(onUser.indexOf(user) == -1)
            onUser.push(user);
        console.log(onUser);
        io.emit('on-user',onUser);
      })
})

/**
 * Creating server at port 3000
 */
server.listen(3000, () => console.log('Connected'));
