const express = require("express");
const router = express.Router();
const passportAuth = require("../utils/passport").passportAuth;

// controller modules

const controller = require("../controllers/controller");
const passport = require("passport");

// GET Routes

router.get("/", controller.index);

router.get("/sign-up", controller.sign_up_get);

router.get("/messages", controller.messages_get);

router.get("/login", controller.login_get);

router.get("/member-challenge", controller.member_challenge_get);

router.get("/admin-challenge", controller.admin_challenge_get);

router.get("/logout", controller.logout_get);

router.post("/sign-up", controller.sign_up_post);

router.post("/login", passportAuth, controller.login_post);

module.exports = router;
