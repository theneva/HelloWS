var app = angular.module('helloWs', []);

app.controller('UsersController', function ($scope, UserService) {
    UserService.getUsers()
        .success(function (users) {
            $scope.users = users;
        });
});

app.service('UserService', function ($http) {
    this.getUsers = function () {
        return $http.get('/api/users');
    };
});
