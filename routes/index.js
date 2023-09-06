const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.locals = {
    title: "Members Only",
    message: "this is a message!",
  };
  res.render("index");
});

// GET sign up page
router.get("/sign-up", function (req, res, next) {
  res.locals = {
    title: "Members Only",
    message: "this is a message!",
  };
  res.render("sign-up");
});

// get messages page
router.get("/messages", function (req, res, next) {
  res.locals = {
    title: "Members Only",
    message: "this is a message!",
  };
  res.render("messages");
});

// get login page
router.get("/login", function (req, res, next) {
  res.locals = {
    title: "Members Only",
    message: "this is a message!",
  };
  res.render("login");
});

// get member challenge page
router.get("/member", function (req, res, next) {
  res.locals = {
    title: "Members Only",
    message: "this is a message!",
  };
  res.render("member-challenge");
});

// get admin challenge page

router.get("/admin", function (req, res, next) {
  res.locals = {
    title: "Members Only",
    message: "this is a message!",
  };
  res.render("admin-challenge");
});

module.exports = router;
