'use strict';
/**
 * Created by x on 19/12/15.
 */
// *** CONTROLLERS
var appName = 'nexio';
var controllers = angular.module(appName + 'Controllers', [
    'chart.js',
    'ui.bootstrap'
]);


controllers.controller('TabsDemoCtrl', function ($scope, $window) {
    $scope.tabs = [
        { title:'Global', content:'Dynamic content 1' },
        { title:'Group', content:'Dynamic content 2', disabled: true },
        { title:'User', content:'Dynamic content 2', disabled: true }
    ];

    // on click update




    $scope.alertMe = function() {
        setTimeout(function() {
            $window.alert('You\'ve selected the alert tab!');
        });
    };
});


controllers.controller('eventListCtrl', ['$scope', 'Events',
    function ($scope, Events) {
        console.log("eventListCtrl/INI");
        // feed this with my rest api json response.
        $scope.events = Events.query();
        console.log($scope.events);
        // $scope.events = [];
        // var query = "program:apache";

        console.log("eventListCtrl/END");
    }]);



controllers.controller('userListCtrl', ['$scope', 'Users',
    function($scope, Users){
        console.log("userListCtrl/INI");
        $scope.users = Users.query();
        console.log($scope.users);


        // test bar chart
        $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        console.log("userListCtrl/END");
    }
]);

/*
controllers.controller('eventDetailCtrl', ['$scope', '$routeParams', 'Events'
])
*/