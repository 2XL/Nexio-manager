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


controllers.controller('TabsDemoCtrl', function ($scope, $location) {
    $scope.tabs = [
        {title: 'Global', content: 'Dynamic content 1', render: 'none', disabled: false,},
        {title: 'Group', content: 'Dynamic content 2', render: 'bar', disabled: true,},
        {title: 'User', content: 'Dynamic content 2', render: 'doughnut', disabled: true,}
    ];

    $scope.test = function () {
        console.log("TEST", arguments);
    };

    // on click update
    $scope.alertMe = function () {
        setTimeout(function () {
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
    function ($scope, Users) {
        console.log("userListCtrl/INI");
        $scope.users = Users.query();
        console.log($scope.users);
        // test bar chart
        /*
         $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
         $scope.series = ['Series A', 'Series B'];
         $scope.data = [
         [65, 59, 80, 81, 56, 55, 40],
         [28, 48, 40, 19, 86, 27, 90]
         ];
         */
        $scope.labels = []; // users
        $scope.series = []; //
        $scope.data = [];


        console.log("userListCtrl/END");
    }
]);


controllers.controller("doughnutCtrl", ['$scope', '$interval', 'Users',
    function ($scope, $interval, Users) {

        console.log("doughnutCtrl/INI");

        /*
         $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
         $scope.data = [300, 500, 100];
         */
        // $scope.labels = [];
        // $scope.data = [];

        $scope.users = Users.query(function (items) {


            $scope.labels = [];
            $scope.data = [];

            angular.forEach(items.rows, function (item, idx, all) {

                // console.log(idx, { idx : item});
                $scope.labels.push(item.labels);
                $scope.data.push(item.data);
            });


        });

        // console.log($scope.users);


        /*
         $scope.itv_time = 10000;
         $interval(callAtInterval, $scope.itv_time);

         function callAtInterval() {
         Hosts.query(function (items) {
         // console.log(items)
         angular.forEach(items, function (item, idx, all) {
         if ($scope.hosts[idx].status === item.status) {
         // console.log(" [not changed]" + $scope.hosts[idx].status + " : "+ item.status )
         } else {
         var changeDummy = " [changed dummyhost] from:  " + $scope.hosts[idx].status + " to " + item.status;
         console.log(changeDummy);
         $.notify(changeDummy, 'info');
         $scope.hosts[idx].status = item.status
         }
         if ($scope.hosts[idx].status_sandbox !== item.status_sandbox) {
         var changeSandBox = " [changed sandbox] from:  " + $scope.hosts[idx].status_sandbox + " to " + item.status_sandbox;
         console.log(changeSandBox);
         $.notify(changeSandBox, 'info');
         $scope.hosts[idx].status_sandbox = item.status_sandbox
         }
         if ($scope.hosts[idx].status_benchbox !== item.status_benchbox) {
         var changeBenchBox = " [changed] benchbox from:  " + $scope.hosts[idx].status_benchbox + " to " + item.status_benchbox;
         console.log(changeBenchBox);
         $.notify(changeBenchBox, 'info');
         $scope.hosts[idx].status_benchbox = item.status_benchbox
         }

         })
         });

         }
         */

    }]);

controllers.controller("barCtrl", function ($scope) {


    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];


});

// todo route
// access by ??
controllers.controller("radarCtrl", function ($scope) {


    $scope.labels = ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];
    $scope.data = [
        [65, 59, 90, 81, 56, 55, 40],
        [28, 48, 40, 19, 96, 27, 100]
    ];


});

//
controllers.controller("reactiveCtrl", function ($scope) {


    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
    $scope.data = [300, 500, 100, 40, 120];
    $scope.type = 'PolarArea';

    $scope.toggle = function () {
        $scope.type = $scope.type === 'PolarArea' ?
            'Pie' : 'PolarArea';
    };


});

/*
 controllers.controller('eventDetailCtrl', ['$scope', '$routeParams', 'Events'
 ])
 */