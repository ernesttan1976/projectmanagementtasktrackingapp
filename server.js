require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('./models/users');

passport.use(new GoogleStrategy(
  //config
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  },
  async function verifyCallback(accessToken, refreshToken, profile, cb){
    //user has logged in with OAuth
    //1.Fetch the user from the database and provide them back to Passport by calling the cb() callback function
    //2.If user does not exist, add user to database and pass the user object in the cb function
    try{
      let user = await User.findOne({googleId: profile.id});
      if (user) return cb(null, user);
      user = await User.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
      });
      return cb(null, user);
    } catch (err){
      return cb(err);
    }
  }
));

var methodOverride = require('method-override');


// It's very important to require dotenv before any
// module that depends upon the environment variables
// in the .env file

// Connect to Atlas/MongoDB AFTER the dotenv has processed the .env file
require('./config/database');
require('./config/passport');

var indexRouter = require('./routes/index');
var boardsRouter = require('./routes/boards');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
//To pass req.user to res.locals, if not logged in, req.user is undefined
app.use(function(req,res,next){
    res.locals.user = req.user;
    next();  
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

function isAuthenticated(req, res, next){
  if (req.user || req.session){
    //req.user is set if googleOAuth logged in
    //req.session is set if local logged in
    next();
  } else {
    res.status(401).send('401 User is not logged in, unauthorised');
  }
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/boards', isAuthenticated, boardsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
