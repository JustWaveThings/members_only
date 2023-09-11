require('dotenv').config();
const debug = require('debug')('app');
const createError = require('http-errors');
const express = require('express');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const MongoDBStore = require('connect-mongodb-session')(session);

const database = require('./utils/database');

const indexRouter = require('./routes/index');

const compression = require('compression');
const helmet = require('helmet');
const limiter = require('./utils/rateLimit');

const app = express();

// rate limiter
app.use(limiter);

// database connection
app.use(database);

// helmet
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'script-src': 'self',
    },
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// express session setup

const store = new MongoDBStore({
  uri: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.dmc0his.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  collection: 'sessions',
});

store.on('error', function (error) {
  console.log(error);
});

app.use(
  require('express-session')({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

// passport setup

require('./utils/passport');

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// express locals middleware -- gives us access to the user throughough the app

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.title = 'Members Only Quotes';
  next();
});

app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.member = req.user.member;
    res.locals.admin = req.user.admin;
    res.locals.signedin = true;
    res.locals.id = req.user._id;
    next();
  } else {
    res.locals.signedin = false;
    res.locals.member = false;
    res.locals.admin = false;
    next();
  }
});

// use express ejs layouts middleware
app.use(expressLayouts);

// compression
app.use(compression());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
