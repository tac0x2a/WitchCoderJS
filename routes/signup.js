var express = require('express');
var router = express.Router();

var auth = require('../auth');
var User = require('../models/user.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/return', function(req, res, next) {

    var name       = req.body.name;
    var email      = req.body.email;
    var password   = auth.getHash(req.body.password);
    var password_a = auth.getHash(req.body.password_again);

    if(password != password_a){
      console.log("Is not matched password and again.")
      res.redirect('/signup');
    }

    User.create({ name: name, email: email, password: password}, function (err, user) {
      if (err) return handleError(err);

      console.log("Created User:", name, "/", email);
    });

    res.redirect('/signup');
});

module.exports = router;
