var express = require('express');
var router = express.Router();

var auth = require('../auth');
var User = require('../models/user.model');

function signupValidate(name, email, password, password_a){
  if(name === ""){
    return { 'result': false, 'errors' : ['Name is required.']}
  }
  if(email === ""){
    return { 'result': false, 'errors' : ['Email is required.']}
  }
  if(password === ""){
    return { 'result': false, 'errors' : ['Password is required.']}
  }
  if(password_a === ""){
    return { 'result': false, 'errors' : ['Please repeat password again.']}
  }
  if(!(password === password_a)){
    return { 'result': false, 'errors' : ['Different passwords.']}
  }

  return { 'result': true, 'message' : []}
}


/* GET users listing. */
router.get('/', function(req, res) {
  if(req.user){ res.redirect('/user') }
  res.render('signup', {name: "",  email: "", errors: {} });
});

router.post('/return', function(req, res, next) {

  var name   = req.body.name;
  var email  = req.body.email;
  var pass   = req.body.password;
  var pass_a = req.body.password_again;

  //Check password input
  var r = signupValidate(name, email, pass, pass_a )
  if( !r.result ){
    res.render('signup', {
      name: name, email: email, errors: r.errors
    });
    return;
  }

  var password   = auth.getHash(req.body.password);
  var password_a = auth.getHash(req.body.password_again);

  // User model validation
  User.create({name: name, email: email, password: password}, function (err, user) {
    if (err){
      return res.render('signup', {name: name, email: email, errors: err.message});
    }
    req.login(user, function(err){
      if(err){ return; }
      return res.redirect('/');
    })// end of login
  }) // end of User.create
}); // end of router

module.exports = router;
module.exports.signupValidate = signupValidate;
