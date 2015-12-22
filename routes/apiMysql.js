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

    // post query index
    var connection = new mysql.createConnection(constants.mysql.login);

    // var query = constants.mysql.query.queryLvlUser;
    var query = constants.mysql.query.queryLvlGroup;

    console.log("mysql: post...", req.headers.query);
    var result;

    if(req.headers.query == undefined){
        // use the test query
    }else{
        query = req.headers.query;
    }
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

