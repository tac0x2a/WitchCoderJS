var express = require('express');
var auth    = require('../auth');
var router  = express.Router();
var Problem = require('../models/problem.model');
var Attempt = require('../models/attempt.model');

router.get('/', function(req, res, next) {
  res.redirect('/problem/list')
});

router.get('/list', function(req, res, next) {
  Problem.find().populate('owner').exec(function(err, problems){
    if(err) return console.error(err);
    res.render('problem_list', {problems: problems, user: req.user})
  })
});

router.get('/new', function(req, res, next){
  if(!req.user){ res.redirect('/login') }
  return res.render('problem_new', {user: req.user})
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
    owner: req.user._id.toString(),
    judge: judge
  },
  function(err, problem){
    if(err) {
      return res.render('problem_new', {title: title, problem: problem, user: req.user});
    }
    return res.redirect('/problem/' + problem._id)
  });
});

router.get('/attempt/:problem_id', function(req, res, next){
  if(!req.user){ res.redirect('/login') }

  Problem.findById(req.params.problem_id).populate('owner').exec(function(err, problem){
    if(err || problem == null){
      res.status(404);
      return res.send("Problem not found.")
    }

    // create attempt record here.
    return res.render('problem_attempt', { user: req.user, problem: problem });
  })
})

router.post('/attempt/:problem_id', function(req, res, next){

  var submit_time = Date.now() // ?

  console.log(req.body);

  let problemId = req.params.problem_id
  let language    = req.body.language
  let code        = req.body.code

  Problem.findById(req.params.problem_id).exec(function(err, problem){
    if(err || problem == null){
      res.status(404);
      return res.send("Problem not found.")
    }

    let judge = problem.judge.map( (j) => {
      // Kick judge.
      const execSync = require('child_process').execSync;
      const image   = 'docker-judge-ruby';
      //const command = "echo '" + j.input + "' | ruby -e '" + j.code + "' ";
      const command = "ruby -e '" + code + "' ";
      const actual  =  ("" + execSync('docker run -i ' + image + ' ' + command )).trim();

      const result = (j.expected == actual);

      console.log(actual);

      const judgeResult = {
        input: j.input,
        expected: j.expected,
        actual: "" + actual,
        time_ms: 42,
        result: result
      };

      console.log(judgeResult);

      return judgeResult;
    });

    // Store to DB
    Attempt.create({
      problem: problemId,
      player:  req.user,
      language: language,
      code:     code,
      submited: submit_time,
      judge: judge,
      judge_finished: Date.now()
    }, function(err, attempt){
      if(err){ return res.redirect('/attempt/' + req.params.problem_id) }

      return res.send(attempt)
    }) // end of Attempt.create
  }) // end of Problem.findById
}) // end of router.post('/attempt/:problem_id'

router.get('/:problem_id', function(req, res, next){
  Problem.findById(req.params.problem_id).populate('owner').exec(function(err, problem){
    if(err || problem == null){
      res.status(404);
      return res.send("Problem not found.")
    }
    return res.render('problem', { user: req.user, problem: problem });
  })
})

module.exports = router;
