module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render("error", {
      message:
        "You are not authorized to view this resource because you are not logged in.",
    });
  }
};

module.exports.isMember = (req, res, next) => {
  if (req.isAuthenticated() && req.user.member) {
    next();
  } else {
    res.render("error", {
      message:
        "You are not authorized to view this resource because you are not a member.",
    });
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    res.render("error", {
      message:
        "You are not authorized to view this resource because you are not an Admin.",
    });
  }
};
