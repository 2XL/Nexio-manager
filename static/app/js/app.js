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
        when('/dashboard/list', {
            templateUrl: '/app/partials/chart/bar.html',
            controller: 'userListCtrl'
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


