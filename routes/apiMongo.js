//
// http://stackoverflow.com/questions/10610131/checking-if-a-field-contains-a-string
//
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var constants = require('../constants');
var Event = require('../models/EventLite');
var fs = require('fs');
/*
router.get('/', function (req, res, next) {
    console.log("mongo: API");
    res.render('mongo', {title: "Mysql-API"})
});
*/


router.get('/', function (req, res, next) {
    console.log('mongo post');
    Event.find(function (err, events) {
        if (err) return next(err);
         res.json(events.sort({idx: 0})) // orted by id
        // res.json(events); // orted by id
    }); // .limit(10); // .limit
});


router.get('/:id', function(req, res, next){
    console.log('mongo post: id');
    var options = ['config', 'incidences', 'qr', 'reports','charts'];
    var name = options[req.params.id];
    console.log('mongo query '+ req.params.id, name);
    Event.find({module: name}, function(err, events){
        console.log("found: ",events.length);
        res.json(events);
    });

    // visitas month
    // visitas day
    // visitas global

});

module.exports = router;