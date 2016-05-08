var express = require('express');
var auth    = require('../auth');
var router  = express.Router();
var User = require('../models/user.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var user = req.user
  if(user){
    return res.render('user', { user: user });
  }
  res.redirect('/login')
});

router.get('/:user_id', function(req, res, next) {
  User.findById(req.params.user_id, function(err, user){
    if(err || user == null){
      res.status(404);
      return res.send("User not found.")
    }
    return res.render('user', { user: user });
  })
});

module.exports = router;
