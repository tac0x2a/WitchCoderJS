var express = require('express');
var auth    = require('../auth');
var router  = express.Router();
var config = require('../config');
var User = require('../models/user.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var user = req.user
  if(user){
    res.render('user', {
      config: config,
      user: user
    });
  }
  res.redirect('/login')
});

module.exports = router;
