var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/return', function(req, res, next) {
    console.log(req.body);
    // Todo: CreateUser
    res.redirect('/signup');
});

module.exports = router;
