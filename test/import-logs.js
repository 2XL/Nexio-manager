#!/usr/bin/nodejs
console.log('import-logs.js');
// llistar els fitchers que hi ha al directori logs
var constants = require('../constants');
var fs = require('fs');
var walk = require('walk');
var csv = require('fast-csv');
var async = require('async');
// var iterators = require('async-iterators');
var files = [];
var dummySemaphore = false; // :D
var index = 0;
var dataIdx = 0;
// walker options
var walker = walk.walk('../logs/load', {followLings: false});

var schemaName = 'xxxes';

var mongoose = require('mongoose');
// var tsv = require();
var eventSchema = mongoose.Schema({
    idx: {
        type: String,
        index: {
            unique: true
        }
    }, // this will be considered primary key
    // received_at: String,
    generated_at: String,

    // display_received_at: String,
    //source_id: String,
    //source_name: String,
    source_ip: String,
    program: String,
    // hostname: String,
    facility: String,
    //
    //severity: String,
    // message: String,
    module: String,
});


console.log("Connection OK");
var csvStream = csv({delimiter: '\t'})
    .on('data', function (data) {
        // do something with the data
        // if (data[4] == 'vls15613' && data[8] == 'apache' && data[9].indexOf('"GET /incidents/ HTTP/1.1"') != -1) {

        var index = 1;
        var options = ['config', 'incidences', 'qr', 'reports', 'charts'];
        // var name = options[index];
        if (data[4] == 'vls15613' && data[8] == 'apache') {
            // refactor this
            if( data[9].indexOf('"GET /' + options[0] + '/ HTTP/1.1"') != -1
            || data[9].indexOf('"GET /' + options[1] + '/ HTTP/1.1"') != -1
            || data[9].indexOf('"GET /' + options[2] + '/ HTTP/1.1"') != -1
            || data[9].indexOf('"GET /' + options[3] + '/ HTTP/1.1"') != -1
            || data[9].indexOf('"GET /' + options[4] + '/ HTTP/1.1"') != -1) {

                console.log(" " + data + '.' + dataIdx++);
                // console.log(data[0]);
                // console.log(data[4] + data[8]);
                // filtro primario solamente logs trazas del apache y del server
                var string = data[9].split('/')[3];
                console.log(string);

                var anEvent = new Event({
                    idx: data[0],
                    // received_at: data[1],
                    generated_at: data[2],
                    // display_received_at: String,
                    //source_id: data[3],
                    //source_name: data[4],
                    source_ip: data[5],
                    program: data[6],
                    // hostname: String,
                    facility: data[7],
                    // etc
                    //severity: data[8],
                    // message: data[9],
                    module: string
                });


                 anEvent.save(function (err, event) {
                 if (err) return console.error(err);
                 // console.log(event);
                 });

            }
        }

    })
    .on('end', function () {
        console.log("end: "); // +files[index])
    })
    .on('finish', function () {
        console.log("finish file: "); // + files[index]);
        // done parsing a file
    });


console.log("Walking");
walker.on('file', function (root, stat, next) {
    console.log(stat.name);
    // handle this file with mongoose
    // check if entry exists in the database
    if (stat.name.indexOf('.tsv') == -1) {
        console.log("skip:" + stat.name);
    } else {
        var filePath = root + '/' + stat.name;
        files.push(filePath);
    }
    next();
});


walker.on('end', function () {
    console.log(files);
});


var Event = mongoose.model(schemaName, eventSchema); // 'Event' is the collection name
mongoose.connect(constants.mongodb.nexio);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // yay!
    // loop though the files


    function parseFiles(files, callback) {
        var file = files.pop();
        var dataIdxOld; // undefined
        var stream = new fs.createReadStream(file);
        // csvStream;
        stream.pipe(csvStream, {end: false});
        dummySemaphore = true;
        console.log(file);
        var itv = setInterval(function () {
            if (dummySemaphore == true) {
                if (dataIdx === dataIdxOld) {
                    dummySemaphore = false;
                } else {
                    dataIdxOld = dataIdx;
                }
                console.log("wait: " + file + " " + dataIdx + " " + dataIdxOld);
                // noop : wait green light
            } else {
                index++;
                if (files.length == 0)
                    return;
                callback(files, parseFiles);
                clearInterval(itv);
            }
        }, 1500);
        // to speed up the process lower the virtual delay...
    }

    parseFiles(files, parseFiles);


});








