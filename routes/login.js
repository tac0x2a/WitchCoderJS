var auth = require('../auth');
var User = require('../models/user.model');

// Passport -----------------------------------------------
var passport_local = require("passport")
var LocalStrategy  = require("passport-local").Strategy;


function loginValidate(user, email, password){
  if(email === ""){
    return {result: false, message: "Email is required."}
  }
  if(password === ""){
    return {result: false, message: "Password is required."}
  }
  if(!user){
    return {result: false, message: "User is not found."}
  }
  if(user.password !== password){
    return {result: false, message: "Password is incorrect."}
  }

  return {
    'result': user,
    'message' : "Login success."
  }
}

passport_local.use(new LocalStrategy(
  {usernameField: "email", passwordField: "password", passReqToCallback: true},
  function(req, email, password, done){
    req.flash('email', email)

    User.findOne({email: email}, function(err, user){
      if(err){ return done(err); }

      var hPassword = auth.getHash(password)
      var r = loginValidate(user, email, hPassword)
      req.flash('error', r.message)

      return done(null,  r.result)
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
  res.render('login', {
    email:   req.flash('email'),
    error:   req.flash('error'),
    message: req.flash('message'),
    errors:  req.flash('errors')
  });
});

router.post('/return',
  passport_local.authenticate( "local",
    {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    }
  )
);

module.exports = router;
module.exports.loginValidate = loginValidate;
