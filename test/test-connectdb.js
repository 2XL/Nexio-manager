#!/usr/bin/nodejs

var mysql = require("mysql");
var constants = require("../constants");

console.log(constants)


var connection = mysql.createConnection(constants.mysql.login);


connection.connect();
var query = "show tables";
connection.query(query, function( err, rows, fields){
    if(err) throw err;

    console.log(fields);
    rows.forEach(function(item){
        console.log(item);
    });
});
connection.end();





console.log("test.connectdb.js");


