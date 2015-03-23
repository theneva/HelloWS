var ws = require('ws');

exports.connect = function (httpServer) {
    var wsServer = new ws.Server({server: httpServer});

    wsServer.on('connection', function (socket) {
        socket.send('Hello, sockets!');
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
