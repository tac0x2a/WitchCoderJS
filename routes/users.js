var express = require('express');
var router = express.Router();

var User = require('../models/user.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var u = User.findOne
  console.log(u)
  res.render('user', { title: 'Users', user: u});
});

module.exports = router;
