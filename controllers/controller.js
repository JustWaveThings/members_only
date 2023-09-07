const User = require("../models/users");
const Message = require("../models/messages");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

/* GET ROUTES  */

/* GET home page. */
exports.index = asyncHandler(async (req, res, next) => {
  res.render("index");
});

// GET sign up page
exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.render("sign-up", { title: "Members Only", errors: null, user: null });
});

// get messages page
exports.messages_get = asyncHandler(async (req, res, next) => {
  res.render("messages");
});

// get login page
exports.login_get = asyncHandler(async (req, res, next) => {
  res.render("login");
});

// get member challenge page
exports.member_challenge_get = asyncHandler(async (req, res, next) => {
  res.render("member-challenge", { errors: null });
});

// get admin challenge page

exports.admin_challenge_get = asyncHandler(async (req, res, next) => {
  res.render("admin-challenge");
});

// post sign up page

exports.sign_up_post = [
  // validate and sanitize fields
  body("firstName", "Username must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("lastName", "Username must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("username", "Email must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("confirmPassword", "Password must not be empty.").trim().escape(),
  body("username").custom(async (value) => {
    const user = await User.findOne({ username: value });
    if (user) {
      throw new Error("Email already in use");
    }
  }),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    } else {
      return true;
    }
  }),

  // process request after validation and sanitization

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);

    const user = new User({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    console.log(errors);
    if (!errors.isEmpty()) {
      res.render("sign-up", {
        user: user,
        errors: errors.array(),
      });
      return;
    } else {
      await user.save();
      res.redirect("/login");
    }
  }),
];

// post login page

exports.login_post = [
  // validate and sanitize fields
  body("username", "Email must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      res.render("/login", {
        errors: errors.array(),
      });
      return;
    } else {
      passport.authenticate("local", {
        successRedirect: "/messages",
        failureRedirect: "/login",
        failureMessage: true,
      });
    }
  }),
];
