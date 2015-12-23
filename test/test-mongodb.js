#!/usr/bin/nodejs

console.log("Mongodb");
var constants = require('../constants');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');




MongoClient.connect(constants.mongodb.nexio, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
});



var mongoose = require('mongoose');


