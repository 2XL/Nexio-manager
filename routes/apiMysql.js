var express = require('express');
var router = express.Router();
var constants = require("../constants");
var mysql = require("mysql");
var co = require("co");

/* GET noop */
router.get('/', function (req, res, next) {
    //
    console.log("mysql: API");
    res.render('mysql', {title: "Mysql-API"})
});

/* POST */
router.post('/', function (req, res, next) {
    var connection = new mysql.createConnection(constants.mysql.login);
    console.log("mysql: post", req.headers.query);
    var result;
    var query = req.headers.query;
    connection.connect();
    connection.query(query, function (err, rows, fields) {
        if (err) throw err;
        console.log(rows.length); // number of results
        result = {rows: rows, fields: fields};
        res.json(result);
    });
    connection.end();
});

module.exports = router;

