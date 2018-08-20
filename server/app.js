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

mongoose.connect(config.database, {useNewUrlParser: true});
var database = mongoose.connection

app.get('/', function(req, res){
    res.send('Connected');
});

mongoose.connection.on('connection', () => {
    console.log('Connected to database ' + config.database);
    
})

mongoose.connection.on('error', (err) => {
    console.log('Error ' + err);
    
})


app.use(cors());

//app.use(express.static(Path.join(__dirname, 'public')));

var users = require('./routes/users');

app.use(bodyParser.json());
app.use('/', users);
//chat.getTokenValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNzY1ZDY5YjRiZGI4MWMzYjIyN2YxNSIsImlhdCI6MTUzNDczOTY3NiwiZXhwIjoxNTM0NzQzMjc2fQ.zDjio6gNgKDGI2bLeo3Ezr_3PWfk1CdFRJbBD_sTwRw');
io.on('connection', function(socket){
    console.log('a user connected');
    // socket.on('disconnect', function(){
    //     console.log('a user disconnected');
    // })
    socket.on('new-message', (message, token, email) => {
        console.log(message);
        console.log(token);
        console.log(email);
        
        chat.getTokenValue(token,message);
        io.emit('new-message',message,email);
      });
})

server.listen(3000, () => console.log('Connected'));
