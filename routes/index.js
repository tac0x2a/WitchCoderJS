var express = require('express');
var router = express.Router();
var config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = req.user
  res.render('index', {
    config: config,
    user: user
  });
});

module.exports = router;
