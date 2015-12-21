"use strict"
//---------------
// Routes
//---------------
var appName = 'nexio';
var routes = angular.module(appName + 'Routes', ['ngRoute']);
routes.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', { // quan accedeixo al root de home es criden aquests controladors
            templateUrl: 'html/hosts.html',
            controller: 'HostController'
        })
        .when('/:id', { // si especifico amb un id es crida aquest
            templateUrl: 'html/hostDetails.html',
            controller: 'HostDetailCtrl'
        });
}]);