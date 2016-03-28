var express = require('express');
var app = express();

// receive http request
app.get('/', function (req, res) {
  res.send("Hello, World");
});

// launch server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Judge server is started at http://%s:%s", host, port);
});
