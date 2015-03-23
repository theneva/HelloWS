var express = require('express');
var app = express();

app.use(express.static(__dirname + '/../angular'));

app.get('/api/users', function (req, res) {
    return res.json([
        {username: 'theneva', realName: 'Martin'},
        {username: 'theknarf', realName: 'Frank'}
    ]);
});

var server = app.listen(3456, function () {
    console.log('Server listening on port ' + 3456);
});

require('./sockets').connect(server);
