const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

exports.loginGetController = (req, res, next) => {
  res.render("login", {
    title: "Login to Your Account",
    msg: "",
    isLoggedIn: "",
  });
};

exports.loginPostController = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const checkUser = User.findOne({ username: username });
  checkUser.exec((err, data) => {
    if (data == null) {
      res.render("login", {
        title: "Login to Your Account",
        msg: "Invalid Username and Password.",
        isLoggedIn: "",
      });
    } else {
      if (err) throw err;
      const getUserID = data._id;
      const getPassword = data.password;
      if (bcrypt.compareSync(password, getPassword)) {
        const token = jwt.sign({ userID: getUserID }, "loginToken");
        localStorage.setItem("userToken", token);
        localStorage.setItem("loginUser", username);
        localStorage.setItem("userID", getUserID);
        req.session.username = username;
        res.redirect("/dashboard");
      } else {
        res.render("login", {
          title: "Login to Your Account",
          msg: "Invalid Username and Password.",
          isLoggedIn: "",
        });
      }
    }
  });
};

exports.logoutController = (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) {
      res.redirect("/");
    }
  });
  localStorage.removeItem("userToken");
  localStorage.removeItem("loginUser");
  res.redirect("/");
};
