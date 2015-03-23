var sockets = require('./sockets');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/../angular'));

app.use(require('body-parser').json());

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

var server = app.listen(3456, function () {
    console.log('Server listening on port ' + 3456);
});

sockets.connect(server);
