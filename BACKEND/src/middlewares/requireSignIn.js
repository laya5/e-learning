const jwt = require("jsonwebtoken");
exports.requireSignIn = (req, res, next) => {
  if (req.headers.authorization) {
    var token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_TOKEN);
    console.log(user);
    req.user = user;
    next();
  } else {
    res.status(400).json({
      message: "signIn required",
    });
  }

  //return jwt.decode();
};
exports.adminAuth = (req, res, next) => {
  if (req.user.role == "Admin") {
    next();
  } else {
    res.status(400).json({
      message: "invalid role",
    });
  }
};

exports.userAuth = (req, res, next) => {
  console.log(req.user.role);
  if (req.user.role == "user") {
    next();
  } else {
    res.status(400).json({
      message: "invalid role",
    });
  }
};
