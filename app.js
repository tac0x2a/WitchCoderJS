var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var signup = require('./routes/signup');

var app = express();

// auth with google --------------------------------------------------
var auth_google_secret = require('./auth_google_secret');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport');
passport.use(new GoogleStrategy({
  clientID:     auth_google_secret.clientID,
  clientSecret: auth_google_secret.clientSecret,
  callbackURL: '/auth/google/callback',
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile.displayName);
    console.log(profile.emails[0].value);
    console.log(profile.id);

    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));
app.get('/auth/google',
  passport.authenticate('google', { scope: ['email profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("RES:" + res);
    // Authenticated successfully
    res.redirect('/');
  });

//app.use('/auth', auth);
// auth with google --------------------------------------------------


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/signup', signup);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
