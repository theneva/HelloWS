var app = angular.module('usersAppDemo', []);

app.run(function ($rootScope) {
    var url = 'ws://localhost:7803';
    var connection = new WebSocket(url);

    connection.onopen = function () {
        console.log('Hi from websocket');
    };

    connection.onmessage = function (event) {
        var payload = JSON.parse(event.data);
        var eventName = 'ws:' + payload.topic;
        $rootScope.$broadcast(eventName, payload.data);
    };
});

app.controller('UsersController', function ($scope, $http) {
    $http.get('/api/users')
        .success(function (users) {
            $scope.users = users;
        });

    $scope.createUser = function (username, realName) {
        $http.post('/api/users', {
            username: username,
            realName: realName
        });
    };

    $scope.$on('ws:welcome', function (event, message) {
        console.log('welcome message:');
        console.log(message);
    });

    $scope.$on('ws:new_user', function (event, user) {
        console.log(event);
        console.log(user);

        $scope.$apply(function () {
            $scope.users.push(user);
        });
    });
});
