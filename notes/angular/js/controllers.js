var app = angular.module('helloWs', []);

app.run(function ($rootScope) {
    var url = 'ws://localhost:3456';
    var connection = new WebSocket(url);

    connection.onopen = function () {
        console.log('WebSocket opened!');
    };

    connection.onmessage = function (event) {
        var payload = JSON.parse(event.data);
        $rootScope.$broadcast('ws:' + payload.topic, payload.data);
    };
});

app.controller('UsersController', function ($scope, UserService) {
    UserService.getUsers()
        .success(function (users) {
            $scope.users = users;
        });

    $scope.createUser = function (username, realName) {
        UserService.createUser(username, realName);
    };

    $scope.$on('ws:welcome', function (event, message) {
        console.log(event);
        console.log(message);
    });

    $scope.$on('ws:new_user', function(event, newUser) {
        $scope.$apply(function() {
            console.log('event');
            console.log(event);
            console.log('newUser');
            console.log(newUser);
            $scope.users.push(newUser);
            console.log(newUser);
        });
    });
});

app.service('UserService', function ($http) {
    this.getUsers = function () {
        return $http.get('/api/users');
    };

    this.createUser = function (username, realName) {
        return $http.post('/api/users', {username: username, realName: realName});
    };
});
