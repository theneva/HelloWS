var ws = require('ws');

var clients = [];

exports.connect = function (httpServer) {
    var wsServer = new ws.Server({server: httpServer});

    exports.broadcast = function (topic, payload) {
        console.log('broadcasting message with topic = ' + topic + ' and payload = ' + payload);

        clients.forEach(function (client) {
            client.send(JSON.stringify({
                topic: topic,
                data: payload
            }));
        });
    };

    wsServer.on('connection', function (socket) {
        clients.push(socket);

        socket.send(JSON.stringify({
            topic: 'welcome',
            data: 'Hello, sockets!'
        }));
    });
};


//var clients = [];
//var names = [
//    'Garrosh',
//    'Jaina',
//];

//
//        if (clients.length == names.length) {
//            socket.send('Sorry, the room is full.');
//            return;
//        }
//
//        var index = clients.length;
//        var name = names[index];
//
//        clients.push({
//
//  name: name, socket: socket
//        });
//
//        socket.send('Hello, ' + name + '!');
//
//        socket.on('message', function incoming(message) {
//            wsServer.broadcast(name + ': ' + message);
//        });
//    }
//);

//wsServer.broadcast = function (message) {
//    wsServer.clients.forEach(function (client) {
//        client.send(message);
//    });
//};

//};
