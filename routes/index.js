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

router.get("/message-create", isAuth, controller.message_create_get);

router.post("/message-create", isAuth, controller.message_create_post);

router.get("/member-challenge", isAuth, controller.member_challenge_get);

router.post("/member-challenge", isAuth, controller.member_challenge_post);

router.get("/admin-challenge", isMember, controller.admin_challenge_get);

router.post("/admin-challenge", isMember, controller.admin_challenge_post);

router.post("/messages/:_id", isAdmin, controller.message_delete_post);

module.exports = router;
