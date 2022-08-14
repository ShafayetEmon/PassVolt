const Password = require("../models/password");
const bcrypt = require("bcrypt");

exports.addpasswordGetController = (req, res, next) => {
  const username = req.session.username;
  res.render("addpassword", {
    title: "Add New Password",
    isLoggedIn: username,
    msg: "",
    Edit: "Add Password",
  });
};

exports.addpasswordPostController = (req, res, next) => {
  const password = new Password();
  const username = req.session.username;
  password.username = username;
  password.passwordName = req.body.passwordName;
  password.passwordDetails = req.body.passwordDetails;
  password.save(function (err, doc) {
    if (err) throw err;
    res.render("addpassword", {
      title: "Add New Password",
      isLoggedIn: username,
      Edit: "Add Password",
      msg: "Password Inserted Successfully",
    });
  });
};

exports.passworEditGetController = (req, res, next) => {
  const username = req.session.username;
  const id = req.params.id;
  const getPassDetails = Password.findById({ _id: id });

  getPassDetails.exec(function (err, data) {
    if (err) throw err;
    res.render("editpassword", {
      title: "Edit Password",
      isLoggedIn: username,
      record: data,
      msg: "",
      Edit: "Edit Password",
    });
  });
};

exports.passworEditPostController = (req, res, next) => {
  const id = req.params.id;
  const username = req.session.username;
  const passwordName = req.body.passwordName;
  const passwordDetails = req.body.passwordDetails;

  Password.findByIdAndUpdate(id, {
    passwordName: passwordName,
    passwordDetails: passwordDetails,
  }).exec(function (err) {
    if (err) throw err;
    Password.findById({ _id: id }).exec(function (err, data) {
      if (err) throw err;
      res.render("editpassword", {
        title: "Edit Password",
        isLoggedIn: username,
        record: data,
        msg: "Password Edited Successfully",
        Edit: "Password Inserted Successfully",
      });
    });
  });
};

exports.passwordDeleteController = (req, res) => {
  const id = req.params.id;
  Password.findByIdAndDelete(id).exec(function (err, data) {
    if (err) throw err;
    res.redirect("/viewallpassword");
  });
};

exports.viewAllPassController = async (req, res) => {
  const username = req.session.username;
  const perPage = 5;
  const page = req.params.page || 1;

  await Password.find({ username: new RegExp("^" + username + "$", "i") })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(function (err, data) {
      if (err) throw err;
      Password.countDocuments({}).exec((err, count) => {
        res.render("viewallpassword", {
          title: "View All Password",
          isLoggedIn: username,
          records: data,
          current: page,
          pages: Math.ceil(count / perPage),
        });
      });
    });
};

exports.viewAllPassPageController = async (req, res, next) => {
  const username = req.session.username;
  const perPage = 5;
  const page = req.params.page || 1;
  console.log(page);
  await Password.find({ username: new RegExp("^" + username + "$", "i") })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(function (err, data) {
      if (err) throw err;
      Password.countDocuments({}).exec((err, count) => {
        res.render("viewallpassword", {
          title: "View All Password",
          isLoggedIn: username,
          records: data,
          current: page,
          pages: Math.ceil(count / perPage),
        });
      });
    });
};
