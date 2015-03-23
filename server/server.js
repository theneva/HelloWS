var express = require('express');
var app = express();

var sockets = require('./sockets');

app.get('/', function(req, res) {
    res.send('hi');
});

var port = 7803;
var httpServer = app.listen(port, function() {
    console.log('server listening on port: ' + port);
});

sockets.connect(httpServer);
