var express = require('express');
var router  = express.Router();
var User = require('../../models/user.model');

/* GET users listing. */
router.get('/count', function(req, res, next) {
  User.find(function(err, users){
    if(err) return console.error(err);
    res.send({user_count:users.length})
  })
});

module.exports = router;
