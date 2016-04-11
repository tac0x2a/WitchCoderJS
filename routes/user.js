var express = require('express');
var auth    = require('../auth');
var router  = express.Router();

var User = require('../models/user.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var user = req.user
  if(user){
    res.render('user', { name: user.name, email: user.email} );
  }
  res.redirect('/login')
});

module.exports = router;
