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

io.on('connection', function(socket){
    console.log('a user connected');
    // socket.on('disconnect', function(){
    //     console.log('a user disconnected');
    // })
    socket.on('new-message', (message) => {
        console.log(message);
        io.emit(message);

      });
})

server.listen(3000, () => console.log('Connected'));
