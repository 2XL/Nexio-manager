#!/usr/bin/nodejs

console.log("Mongodb");
var constants = require('../constants');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Event = require('../models/EventLite');

MongoClient.connect(constants.mongodb.nexio, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
});

var mongoose = require('mongoose');
mongoose.connect(constants.mongodb.nexio, function (err) {
    if (err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');

        Event.find(function (err, events) {
            if (err) return next(err);
            // res.json(events.sort({id: 0})) // orted by id
            console.log({size: events}); // orted by id
        }); // .limit(10);
    }
});


 // .limit