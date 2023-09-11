require('dotenv').config();
const User = require('../models/users');
const Message = require('../models/messages');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

/* GET ROUTES  */

/* GET home page. */
exports.index = asyncHandler(async (req, res, next) => {
  res.render('index');
});

// GET sign up page
exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.render('sign-up', { title: 'Members Only', errors: null, user: null });
});

// get messages page
exports.messages_get = asyncHandler(async (req, res, next) => {
  const messages = await Message.find()
    .populate('user')
    .sort({ timestamp: -1 })
    .exec();

  console.log(messages);
  res.render('messages', { messages: messages });
});

// get login page
exports.login_get = asyncHandler(async (req, res, next) => {
  let sessionAuthMessage = req.session.messages
    ? req.session.messages.at(-1)
    : null;

  res.render('login', {
    user: req.user,
    authMessage: sessionAuthMessage,
  });
});

// get member challenge page
exports.member_challenge_get = asyncHandler(async (req, res, next) => {
  res.render('member-challenge', { error: null, message: null });
});

// get admin challenge page

exports.admin_challenge_get = asyncHandler(async (req, res, next) => {
  res.render('admin-challenge');
});

// get logout page

exports.logout_get = asyncHandler(async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

// post sign up page

exports.sign_up_post = [
  // validate and sanitize fields
  body('firstName', 'Username must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('lastName', 'Username must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('username', 'Email must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password', 'Password must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('confirmPassword', 'Password must not be empty.').trim().escape(),
  body('username').custom(async (value) => {
    const user = await User.findOne({ username: value });
    if (user) {
      throw new Error('Email already in use');
    }
  }),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    } else {
      return true;
    }
  }),

  // process request after validation and sanitization

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      try {
        const user = new User({
          username: req.body.username,
          password: hashedPassword,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        });
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.render('sign-up', {
            user: user,
            errors: errors.array(),
          });
          return;
        } else {
          await user.save();
          res.redirect('/login');
        }
      } catch (err) {
        next(err);
      }
    });
  }),
];

// post login page

exports.login_post = [
  // validate and sanitize fields
  body('username', 'Email must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password', 'Password must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // process request after validation and sanitization

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('/login', {
        errors: errors.array(),
      });
      return;
    } else {
      next();
    }
  }),
];

exports.message_create_get = asyncHandler(async (req, res, next) => {
  res.render('message-create', {
    title: 'Members Only',
    errors: null,
    user: null,
  });
});

exports.message_create_post = [
  // validate and sanitize fields
  body('title', 'Title must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('message', 'message must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // process request after validation and sanitization

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    try {
      const message = new Message({
        title: req.body.title,
        message: req.body.message,
        user: res.locals.id,
        timestamp: Date.now(),
      });
      if (!errors.isEmpty()) {
        res.render('message-create', {
          message: message,
          errors: errors.array(),
        });
        return;
      } else {
        await message.save();

        res.redirect('messages');
      }
    } catch (error) {
      next(error);
    }
  }),
];

exports.member_challenge_post = [
  // validate and sanitize field
  body('question', 'Answer cannot be empty').trim().isLength(10).escape(),
  // process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    const match = await bcrypt.compare(
      req.body.question,
      process.env.MEMBER_SECRET_HASH
    );

    if (match) {
      await User.findByIdAndUpdate(res.locals.id, { member: true });
      res.status(200).redirect('messages');
    } else {
      res.render('member-challenge', {
        message: 'Incorrect answer. Try again.',
      });
    }
  }),
];

exports.admin_challenge_post = [
  // validate and sanitize field
  body('admin', 'Answer cannot be empty').trim().isLength({ min: 8 }).escape(),
  // process request after validation and sanitization

  asyncHandler(async (req, res, next) => {
    const match = await bcrypt.compare(
      req.body.admin,
      process.env.ADMIN_SECRET_HASH
    );
    if (match) {
      await User.findByIdAndUpdate(res.locals.id, { admin: true });
      res.status(200).redirect('messages');
    } else {
      res.render('admin-challenge', {
        message: 'Incorrect answer. Try again.',
      });
    }
  }),
];

exports.message_delete_post = asyncHandler(async (req, res) => {
  await Message.findByIdAndRemove(req.params._id);
  res.redirect('/messages');
});
