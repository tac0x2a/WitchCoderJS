var express = require('express');
var auth    = require('../auth');
var router  = express.Router();
var Problem = require('../models/problem.model');

router.get('/', function(req, res, next) {
  Problem.find(function(err, problems){
    if(err) return console.error(err);
    res.send(problems)
  })
});

module.exports = router; 
