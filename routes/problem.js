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

router.get('/new', function(req, res, next){
  return res.render('problem_new')
});

router.post('/new', function(req, res, next){
  var title    = req.body.title
  var problem  = req.body.problem
  var input    = req.body.input
  var expected = req.body.expected

  if(typeof input === 'string'){
    input = [input]
    expected = [expected]
  }

  var judge = new Array()
  for(var i = 0; i < input.length; i++){
    judge.push({input:input[i], expected:expected[i]});
  }

  Problem.create({
    title:    title,
    question: problem,
    owner: "me",
    judge: judge
  },
  function(err, problem){
    if(err) {
      return res.render('problem_new', {title: title, problem: problem});
    }
    return res.redirect('/problem')
  });
});


module.exports = router;
