var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var name = req.user && req.user['name'] || "NotLogin"
  res.render('index', { title: 'Express', name: name});
});

module.exports = router;
