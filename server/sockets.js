var ws = require('ws');

var sockets = [];

exports.connect = function (httpServer) {
    var server = new ws.Server({server: httpServer});

    function broadcast (message) {
        sockets.forEach(function (socket) {
            socket.send(message);
        });
    }

    server.on('connection', function (socket) {
        sockets.push(socket);

        socket.send('ANANAS ER BEST');

        socket.on('message', function(message) {
            broadcast(message);
        });
    });
};
