var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var config = require('./config/database');
var cors = require('cors');
var http = require('http').Server(app);
var io = require('socket.io')(http);

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

app.get('/socket', (req, res) => {
    res.json('Connected')
})

io.set("log level", 0);
io.sockets.on("connection", function (socket) {
    socket.on("echo", function (msg, callback) {
        callback = callback || function () {};
 
        socket.emit("echo", msg);
 
        callback(null, "Done.");
    });
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('a user disconnected');
    })
    
})

http.listen(5001, () => console.log('Connected'));
