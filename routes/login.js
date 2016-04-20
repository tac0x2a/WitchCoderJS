var auth = require('../auth');
var User = require('../models/user.model');

// Passport -----------------------------------------------
var passport_local = require("passport")
var LocalStrategy  = require("passport-local").Strategy;


function loginValidate(user, email, password){
  if(email === ""){
    return {result: false, message: {message: "Email is required."}}
  }
  if(password === ""){
    return {result: false, message: {message: "Password is required."}}
  }
  if(!user){
    return {result: false, message: {message: "User is not found."}}
  }
  if(user.password !== password){
    return {result: false, message: {message: "Password is incorrect."}}
  }

  return {
    'result': user,
    'message' : {message: "Login success."}
  }
}

passport_local.use(new LocalStrategy(
  {usernameField: "email", passwordField: "password"},
  function(email, password, done){
    User.findOne({email: email}, function(err, user){
      if(err){ return done(err); }

      var hPassword = auth.getHash(password)
      var r = loginValidate(user, email, hPassword)

      return done(null, r.result, r.message)
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
  res.render('login', {email: "", errors: {}});
});

router.post('/return',
  passport_local.authenticate( "local",
    {
      successRedirect: '/',
      failureRedirect: '/login'
    }
  )
);

module.exports = router;
module.exports.loginValidate = loginValidate;
