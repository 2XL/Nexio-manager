#!/usr/bin/nodejs
/**
 * Created by x on 23/12/15.
 */


var fs = require('fs');
var filePath = '../logs/data.json';
var format = 'utf8';

// var obj = JSON.parse(fs.readFileSync(filePath));

fs.readFile(filePath, format, function(err, data){

    if(err) throw err;
    // console.log(JSON.parse(data));

} );
