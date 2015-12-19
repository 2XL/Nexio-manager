var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nexio-Manager' });
});


router.get('/dashboard', function(req, res, next){
  res.render('dashboard', {title: 'Nexio-Dashboard'})
})


module.exports = router;

