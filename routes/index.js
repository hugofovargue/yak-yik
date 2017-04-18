var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Createzone route for page - Only test*/
router.get('/createzone', function(req, res, next) {
  res.render('createzone', null);
});

/* Createcomment route for page - Only test*/
router.get('/createcomment', function(req, res, next) {
  res.render('createcomment', null);
});

module.exports = router;
