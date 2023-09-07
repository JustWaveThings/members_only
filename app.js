const debug = require("debug")("app");
const createError = require("http-errors");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const user_controller = require("./models/users");
const message_controller = require("./models/messages");

const indexRouter = require("./routes/index");

const compression = require("compression");
const helmet = require("helmet");

const app = express();

/* const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
  delayMs: 0, // disable delaying - full speed until the max limit is reached
});

app.use(limiter); // apply to all requests */

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
  session({ secret: "keyboard dog", resave: true, saveUninitialized: true })
);

// passport setup

// passport local strategy  function 1

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      const match = await bcrypt.compare(password, user.password);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// passort serialize user function 2

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// passport deserialize user function 3

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// express locals  middleware -- gives us access to the user throughough the app

app.use((req, res, next) => {
  res.locals.title = "Members Only";
  res.locals.currentUser = req.user;
  res.locals.memberStatus = req.memberStatus;
  console.log(res.locals, "res.locals");
  next();
});

function middleware(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    return res.json({
      response: "login",
    });
  }
}

// compression
app.use(compression());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

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
