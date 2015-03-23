var ws = require('ws');

var sockets = [];

exports.connect = function (httpServer) {
    var server = new ws.Server({server: httpServer});

    server.on('connection', function (socket) {
        exports.broadcast = function (topic, data) {
            var payload = {
                topic: topic,
                data: data
            };

            sockets.forEach(function (socket) {
                socket.send(JSON.stringify(payload));
            });
        };

        sockets.push(socket);

        socket.send(JSON.stringify({
            topic: 'welcome',
            data: 'Welcome! HI ananas er best'
        }));

        socket.on('message', function (message) {
            broadcast('new_message', message);
        });
    });
};
