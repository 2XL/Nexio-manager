'use strict';
/**
 * Created by x on 19/12/15.
 */
// *** CONTROLLERS
var appName = 'nexio'
var controllers = angular.module(appName + 'Controllers', []);

controllers.controller('eventListCtrl', ['$scope', 'Events',
    function ($scope, Events) {
        // feed this with my rest api json response.
        $scope.events = Events.query();
        console.log($scope.events);
        $scope.events = [];
        // var query = "program:apache";
        console.log("eventListCtrl");
    }])

/*
controllers.controller('eventDetailCtrl', ['$scope', '$routeParams', 'Events'
])
*/