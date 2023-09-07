require("dotenv").config();
const debug = require("debug")("app");
const createError = require("http-errors");
const express = require("express");
const passport = require("passport");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");

const user_controller = require("./models/users");
const message_controller = require("./models/messages");

const database = require("./utils/database");

const indexRouter = require("./routes/index");

const compression = require("compression");
const helmet = require("helmet");
const limiter = require("./utils/rateLimit");

const app = express();

// rate limiter
app.use(limiter);

// database connection
app.use(database);

// helmet
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": "self",
    },
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// use express layouts middleware
app.use(expressLayouts);

// express session setup

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// passport setup

require("./utils/passport");

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// express locals middleware -- gives us access to the user throughough the app

app.use((req, res, next) => {
  console.log(req.session, "req.session a");
  res.locals.title = "Members Only";
  res.locals.currentUser = req.user;
  res.locals.memberStatus = req.memberStatus;
  next();
});

// compression
app.use(compression());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3001, () => console.log("App listening on port 3001!"));
