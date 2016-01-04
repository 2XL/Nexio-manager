#!/usr/bin/nodejs

var fs = require('fs');
var sites = require('./sites.json');
var users = require('./users.json');
var modules = require('./modules.json');
var empresa = require('./empresa.json');

var http = require('http');
var influx = require('influx');
var client = influx({
    //cluster configuration
    /*
     hosts : [
     {
     host : 'localhost',
     port : 8060, //optional. default 8086
     protocol : 'http' //optional. default 'http'
     }
     ],
     */
    // or single-host configuration
    host: 'localhost',
    port: 8086, // optional, default 8086
    protocol: 'http', // optional, default 'http'
    username: 'admin',
    password: 'admin',
    database: 'test'
})


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
// console.log(sites);
console.log("Args: "+process.argv.slice(2));
var params = process.argv.slice(2);
var delay = 0 in params ? params[0] : 3000; // ms
var burst = 1 in params ? params[1] : 5;
var iters = 2 in params ? params[2] : 1000; //
var length = sites.length;


function getInt(max) {
    return Math.floor(Math.random() * max)
}

var itv = setInterval(function () {
    var reqs = getInt(burst);
    console.log(iters + " " + reqs);
    if (iters > 0) {
        iters--;
        while (reqs > 0) {
            reqs--;
            // var idx = Math.floor(Math.random() * length);

            // var options = sites[idx];
            /*
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
             */

            var measurements = 'visit';
            var tags = {
                module: (modules[getInt(modules.length)].module).replace(' ', '_'),
                user: (users[getInt(users.length)].username).replace(' ', '_'),
                empresa: (empresa[getInt(empresa.length)].nom_empresa).replace(' ', '_'),
                session: getInt(100)
            }

            var tstamp = (new Date().getTime());
            var fields = {
                time: tstamp,
                value: 1
            };
            var options = {}; // {precision : 's'};
            client.writePoint(measurements, fields, tags, options, function (err, response) {
                // done
            })

        }

    } else {
        clearInterval(itv);
    }


}, delay);

