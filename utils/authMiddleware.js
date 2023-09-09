module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render("error", {
      message:
        "You are not authorized to view this resource because you are not logged in.",
      error: {
        status: null,
        stack: null,
      },
    });
  }
};

module.exports.isMember = (req, res, next) => {
  if (req.isAuthenticated() && res.locals.member) {
    next();
  } else {
    res.render("error", {
      message:
        "You are not authorized to view this resource because you are not a member.",
      error: {
        status: null,
        stack: null,
      },
    });
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && res.locals.admin) {
    next();
  } else {
    res.render("error", {
      message:
        "You are not authorized to view this resource because you are not an Admin.",
      error: {
        status: null,
        stack: null,
      },
    });
  }
};
