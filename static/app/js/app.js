'use strict';

/**
 * Created by x on 19/12/15.
 */

var appName = 'nexio';
var app = angular.module(appName, [
    'ngRoute',
    appName + 'Services',
    appName + 'Controllers',
    // appName + 'Routes'
    // appName + 'Filters',
    appName + 'Animations'
]);


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/dashboard', {
            templateUrl: '/app/partials/event-list.html',
            controller: 'eventListCtrl'
        }).
        when('/dashboard/bar', {
            templateUrl: '/app/partials/chart/bar.html',
            controller: 'barCtrl'
        }).
        when('/dashboard/doughnut', {
            templateUrl: '/app/partials/chart/doughnut.html',
            controller: 'doughnutCtrl'
        }).
        when('/dashboard/radar', {
            templateUrl: '/app/partials/chart/radar.html',
            controller: 'radarCtrl'
        }).
        /*
         when('/dashboard/:query', {
         templateUrl: '/templates/event-detail.html',
         controller: 'eventDetailCtrl'
         }).
         */
        otherwise({
            redirectTo: '/dashboard'
        });
    // TODO
    // user layer
    // company layer
    // global layer --> current
}]);


