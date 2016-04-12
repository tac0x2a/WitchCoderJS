var auth = require('../auth');
var User = require('../models/user.model');

var config = require('../config');

// Passport -----------------------------------------------
var passport_local = require("passport")
var LocalStrategy  = require("passport-local").Strategy;

passport_local.use(new LocalStrategy(
  {usernameField: "email", passwordField: "password"},
  function(email, password, done){
    User.findOne({email: email}, function(err, user){
      if(err){ return done(err); }

      if(!user){
        var message = "Email not found '" + email + "'";
        return done(null, false, {message: message});
      }

      var hashedPassword = auth.getHash(password)
      if(user.password !== hashedPassword){
        var message = "Incorrect password"
        return done(null, false, {message: message});
      }

      return done(null, user)
    }); // end of User.findOne
  }
)); // end of passport_local

passport_local.serializeUser(function(user, done) {
  done(null, user.email);
});
passport_local.deserializeUser(function(email, done) {
  User.findOne({email: email}, function(err, user) {
    done(err, user);
  });
});


// Routes -----------------------------------------------
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.user){ res.redirect('/user') }
  res.render('login', {config: config, email: "", errors: {}});
});

router.post('/return',
  passport_local.authenticate( "local",
    { successRedirect: '/',  failureRedirect: '/login' }
  )
);

module.exports = router;
