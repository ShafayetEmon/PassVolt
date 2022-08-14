const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.checkUsername = (req, res, next) => {
  var username = req.body.username;
  var checkexituname = User.findOne({ username: username });
  checkexituname.exec((err, data) => {
    if (err) throw err;
    if (data) {
      return res.render("signup", {
        title: "Password Management System",
        msg: "Username already exists",
      });
    }
    next();
  });
};

exports.checkEmail = (req, res, next) => {
  var email = req.body.email;
  var checkexitemail = User.findOne({ email: email });
  checkexitemail.exec((err, data) => {
    if (err) throw err;
    if (data) {
      return res.render("signup", {
        title: "Password Management System",
        msg: "Email already exists",
      });
    }

    next();
  });
};

exports.checkLoginUser = (req, res, next) => {
  const userToken = localStorage.getItem("userToken");
  try {
    if (req.session.username) {
      const decoded = jwt.verify(userToken, "loginToken");
    } else {
      res.redirect("/");
    }
  } catch (err) {
    res.redirect("/");
  }
  next();
};
