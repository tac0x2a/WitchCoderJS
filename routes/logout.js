var auth = require('../auth');
var User = require('../models/user.model');

// Passport -----------------------------------------------
var passport_local = require("passport")
var LocalStrategy  = require("passport-local").Strategy;

// Routes -----------------------------------------------
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  console.log("Logout", req.body);
  req.logout();
  res.redirect("/");
});

module.exports = router;
