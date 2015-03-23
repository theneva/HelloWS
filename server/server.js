var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var sockets = require('./sockets');

app.use(express.static(__dirname + "/../angular"));
app.use(bodyParser.json());

var users = [
    {username: 'theneva', realName: 'Martin'},
    {username: 'theknarf', realName: 'Frank'}
];

app.get('/api/users', function (req, res) {
    return res.json(users);
});

app.post('/api/users', function(req, res) {
    var newUser = req.body;
    users.push(newUser);

    sockets.broadcast('new_user', newUser);

    res.json(newUser);
});

var port = 7803;
var httpServer = app.listen(port, function () {
    console.log('server listening on port: ' + port);
});

sockets.connect(httpServer);
