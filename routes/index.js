var express = require('express');
var router = express.Router();
var config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  var user_name = req.user && req.user['name']
  res.render('index', {
    title:       config['app_name'],
    welcome_msg: config['welcome_msg'],
    app_desc:    config['app_desc'],
    user_name:   user_name
  });
});

module.exports = router;
