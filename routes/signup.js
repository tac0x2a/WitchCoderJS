var express = require('express');
var router = express.Router();
var config = require('../config');

var auth = require('../auth');
var User = require('../models/user.model');

/* GET users listing. */
router.get('/', function(req, res) {
  if(req.user){ res.redirect('/user') }
  res.render('signup', { config: config, name: "",  email: "", errors: {} });
});

router.post('/return', function(req, res, next) {

    var name       = req.body.name;
    var email      = req.body.email;
    var password   = auth.getHash(req.body.password);
    var password_a = auth.getHash(req.body.password_again);

    //Check password input
    if(req.body.password === ""){
      res.render('signup', {
        config: config,
        name: name, email: email, errors: {password: "Need password."}
      });
      return next();
    }
    if(req.body.password_again === ""){
      res.render('signup', {
        config: config,
        name: name, email: email, errors: {password_again: "Need password again." }
      });
      return next();
    }
    if(!(password === password_a)){
      var message = "Is not matched password and again.";
      console.log(message)
      res.render('signup', {
        config: config,
        name: name, email: email, errors: {email_eq: message }
      });
      return next();
    }

    // User model validation
    User.create({name: name, email: email, password: password}, function (err, user) {
      if (err){
        console.log("Error:", err.errors);
        res.render('signup', {
          config: config,
          name: name,
          email: email,
          errors: err.errors
        });
        return next();
      } else {
        req.login(user, function(err){
          if(err){ next(err); }
          res.redirect('/signup');
        })

        req.session.email = email;
        console.log("Created User:", user.name, "/", user.email);
        res.redirect('/signup');
      }
    });
});

module.exports = router;
