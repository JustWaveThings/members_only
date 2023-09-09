const express = require("express");
const router = express.Router();
const passportAuth = require("../utils/passport").passportAuth;

// controller modules

const controller = require("../controllers/controller");

// authentication middleware

const isAuth = require("../utils/authMiddleware").isAuth;
const isAdmin = require("../utils/authMiddleware").isAdmin;
const isMember = require("../utils/authMiddleware").isMember;

// unprotected  routes
router.get("/", controller.index);

router.get("/sign-up", controller.sign_up_get);

router.post("/sign-up", controller.sign_up_post);

router.get("/messages", controller.messages_get);

router.get("/login", controller.login_get);

router.get("/logout", controller.logout_get);

// protected routes

router.post("/login", passportAuth, controller.login_post);

router.get("/message-create", controller.message_create_get);

router.post("/message-create", controller.message_create_post);

router.post("/messages", controller.message_create_post);

router.get("/messages", controller.messages_get);

router.get("/member-challenge", controller.member_challenge_get);

router.get("/admin-challenge", controller.admin_challenge_get);

module.exports = router;
