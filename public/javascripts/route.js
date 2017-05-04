var app = angular.module('heatmapApp', ['ngRoute', 'ngMap']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/Page1', {
            templateUrl: 'views/heatmap.ejs',
            controller: 'heatmapController'
        })
        .otherwise({
            redirectTo: '/register-product'
        });
});

app.controller('TestController', function($scope) {
    $scope.message = "Details";
});
