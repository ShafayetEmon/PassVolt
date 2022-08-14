const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.signupGetController = (req, res, next) => {
  res.render("signup", {
    title: "Create A New Account",
    msg: "",
    isLoggedIn: "",
  });
};

exports.signupPostController = (req, res, next) => {
  let password = req.body.password;
  let confirmPassword = req.body.confirmPassword;
  if (password != confirmPassword) {
    res.render("signup", {
      title: "PassVolt",
      msg: "Password does not match",
      isLoggedIn: "",
    });
  } else {
    let user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = bcrypt.hashSync(req.body.password, 10);

    user.save(function (err, data) {
      if (err) throw err;
      res.render("signup", {
        title: "PassVolt",
        msg: "Account Created Successfully",
        isLoggedIn: "",
      });
    });
  }
};
