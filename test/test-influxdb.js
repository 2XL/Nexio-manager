#!/usr/bin/nodejs

var influx = require('influx');
var constants = require('../constants');
var fs = require('fs');

var influxClient = influx(
    constants.influxdb.config
);

console.log(constants.influxdb.config);
var influxReady = false;

influxClient.getDatabaseNames(function (err, arrDBS) {
    console.log(arrDBS);
    if (err) throw err;
    if (arrDBS.indexOf(constants.influxdb.config.database) > -1) {
        console.log("Database [" + constants.influxdb.config.database + "] ready!");
        influxReady = true;
        // return;
    }
    if (influxReady) {
        // datase exist
        console.log("database exists")
        var parsedJSON = require('../static/json/data.json');
        // console.log(parsedJSON);

        parsedJSON.forEach(function(item, idx){
            // aixo sembla asyncrone done
            var tstamp = new Date(item.generated_at);
            var epoch = tstamp.setMilliseconds(1);
            // tstamp.setMilliseconds(tstamp.getMilliseconds() + 1000);
            // influxClient.writePoint('nexio', {time: epoch, value: 1}, function(){
                influxClient.writePoint(item.module, {time: epoch, value: 1}, {module: item.module}, function(){
                // influxClient.writePoint('nexio', {time: new Date(item.generated_at), value: 1}, {tag: item.module}, function(){
                console.log("done: "+idx);
            } );
        });
    } else {
        influxClient.createDatabase(constants.influxdb.config.database, function (err, result) {
            if (err) throw err;
            console.log("Database created ready");
            influxReady = true;
        });
    }
    //
    // todo --> when the database is available

    // filesystem load json

    // influxClient.writePoint()
    console.log("All done");
});




