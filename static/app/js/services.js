'use strict';
/**
 * Created by x on 19/12/15.
 */
// *** SERVICES
var appName = 'nexio';
var services = angular.module(appName + 'Services', ['ngResource']);
services.factory('Events', ['$resource',
    function ($resource) {
        console.log("factoryEvents");
        return $resource('paper', {}, {
            query: {
                method: 'POST',
                params: {
                    q: "apache"
                },
                isArray: true
            }
        });
    }]);

services.factory('Users', ['$resource',
    function($resource){
        console.log("factoryUsers");
        return $resource('mysql', {}, {
            query: {
                method: 'POST',
                params : {query : "show tables"},

            }
        })
    }
]);