#!/usr/bin/nodejs

var fs = require('fs');
var sites = require('./sites.json');
var http = require('http');
// script that makes requests within x interval
/*
Usage:
define the list of urls at sites.json
and run
delay :  time between requests
burst :  request at each loop
iters :  max loops stop
./visit.js [delay]  [burst] [iters]
 */
console.log(sites);
console.log(process.argv.slice(2));
var params = process.argv.slice(2);
var delay = 0 in params ? params[0] : 3000; // ms
var burst = 1 in params ? params[1] : 1;
var iters = 2 in params ? params[2] : 1000; //
var length = sites.length;

var itv = setInterval(function(){
    var reqs = burst;
    if(iters > 0){
        iters--;
        while(reqs > 0){
            reqs--;
            var idx = Math.floor(Math.random() * length);

            var options = sites[idx];

            http.request(options , function(response){
                // callback
                var str  = '';
                // append input stream
                response.on('data', function(chunk){
                   // str+=chunk;
                });
                // clean stream
                response.on('end', function(){
                   // console.log(str);
                    console.log(options.path);
                });
            }).end()
        }
    }else{
        clearInterval(itv);
    }



}, delay);




