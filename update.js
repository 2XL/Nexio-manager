#!/usr/bin/node

var http = require('http');
var fs = require('fs');

var fileName = "xyz.jpg";
var file = fs.createWriteStream(fileName);

var requestPath = "www";
var request = http.get(requestPath, function(response){
    response.pipe(file);
});



