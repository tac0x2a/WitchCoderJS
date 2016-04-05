var express = require('express');
var router = express.Router();

// Connect to DB
var mongoose   = require('mongoose');
mongoose.connect('mongodb://mongo/judge_sv');
var User = require('../models/user.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/return', function(req, res, next) {
    console.log(req.body);

    var name  = req.body.name;
    var email = req.body.email;

    User.create({ name: name, email: email}, function (err, user) {
      if (err) return handleError(err);
      //return done(err, user);
    });

    res.redirect('/signup');
});

module.exports = router;
