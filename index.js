var express = require("express");
var app = express();
var port = 8000;

//settings
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});
app.use(express.static(__dirname + '/public'));

//socket io integration
var io = require('socket.io').listen(app.listen(port));
console.log("Lytter på port" + port);

//recieve message from client
//socket.io connection handler
//socket which pass to handler is the socket of the client
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});
