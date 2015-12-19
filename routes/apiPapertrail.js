var express = require('express');
var router = express.Router();


var constants = require("../constants");
var Client = require("papertrail");
var assert = require("assert");
var uuid = require("uuid");
var co = require('co');


var done = function (data) {
    console.log("done: " + typeof data);
    console.log(data.events.length);
    return data;
};

/* GET home page. */
router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Nexio-Manager' });
    console.log("papertrail: get", req.query);

    res.render('paper', {title: 'Papertrail-API'});

});


/* POST home page */
router.post('/', function (req, res, next) {
    // res.render('index', { title: 'Nexio-Manager' });
    console.log("papertrail: post", req.query);

    var result = {};

    // post search query?q=program:apache&
    co(function * ()
    {
        // Requires on trail to be available....
        var trail = new Client(constants.papertrail.profile);

        // afegir aixo com api rest.

        var query = {q: req.query};
        var event = yield trail.searchEvents(query);
        assert(typeof event === 'object');
        /*
         Responses

         Papertrail responds with a JSON hash containing 3 important keys:

         events: an array of hashes of log events (one hash per event)
         min_id: the smallest event ID presented
         max_id: the highest event ID presented
         In addition, either reached_beginning or reached_time_limit may be true to indicate the reason why the request ended. See below for more.

         Within each log event hash, the following keys are defined:

         id: unique Papertrail message ID (64-bit integer as JSON string; why?)
         received_at: time when Papertrail received message (ISO 8601 timestamp)
         display_received_at: time when Papertrail received message (human-readable string)
         source_name: sender name in Papertrail (string)
         source_id: unique Papertrail sender ID (32-bit integer)
         source_ip: IP address which originated this log message (string)
         facility: syslog facility (string)
         severity: syslog severity (string)
         program: syslog "tag" field, more commonly called program (string)
         message: log message (string)

         */
        result = event;

    })
    (function (err) {
        if (err){
            console.error(err);
        }else{

        }
        res.json(result);

    });



});


module.exports = router;
