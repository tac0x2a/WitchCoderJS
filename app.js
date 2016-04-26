var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var app = express();

// LoadEnvironment
var config = require('./config');
app.locals = config


// Connect to DB
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/judge_sv'); //Todo: read from param file.

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'session secret',  //Todo Change secretKey
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use('/images', express.static(path.join(__dirname, 'public','images')));
app.use('/javascripts',express.static(path.join(__dirname, 'public','javascripts')));
app.use('/stylesheets',express.static(path.join(__dirname, 'public','stylesheets')));
app.use('/semantic',express.static(path.join(__dirname, 'public','semantic')));
app.use('/angular',express.static(path.join(__dirname, 'public','components','angular')));
app.use('/jquery',express.static(path.join(__dirname, 'public','components','jQuery','dist')));
app.use(passport.initialize());
app.use(passport.session());



// auth with google --------------------------------------------------
var User = require('./models/user.model');
var auth_google_secret = require('./auth_google_secret');
passport.use(new GoogleStrategy({
  clientID:     auth_google_secret.clientID,
  clientSecret: auth_google_secret.clientSecret,
  callbackURL: '/auth/google/callback',
  },
  function(accessToken, refreshToken, profile, done) {
    var name  = profile.displayName;
    var email = profile.emails[0].value;
    var google_id = profile.id;

    // Already exists same email ?
    User.findOne( {$or:[{email: email}, {google_id: google_id}]}, function(err, user){
      if(err){ return done(err); }
      if(user){
        user.email     = email;
        user.google_id = google_id;
        user.save()
        return done(null, user);
      }
      // Need Signup
      User.create({name: name, email: email, google_id: google_id}, function (err, user) {
        if(err){ return done(err) }
        return done(null, user)
      });
    }); // end of User.findOne
  } // end of function(accessToken, refreshToken, profile, done)
)); // end of passport.use GoogleStrategy

passport.serializeUser(function(user, done) {
  done(null, user.email);
});
passport.deserializeUser(function(email, done) {
  User.findOne({email: email}, function(err, user) {
    done(err, user);
  });
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email profile'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google',
    { successRedirect: '/',  failureRedirect: '/login' }
  )
);

//app.use('/auth', auth);
// auth with google --------------------------------------------------

// Routes
app.use('/',       require('./routes/index'));
app.use('/user',   require('./routes/user'));
app.use('/problem', require('./routes/problem'));
app.use('/signup', require('./routes/signup'));
app.use('/login',  require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/api/users', require('./routes/api/users'));

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
