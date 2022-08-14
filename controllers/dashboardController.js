const password = require("../models/password");

exports.dashboardGetController = async (req, res) => {
  const username = req.session.username;
  await password
    .find({ username: new RegExp("^" + username + "$", "i") })
    .exec(function (err, data) {
      if (err) throw err;
      password
        .countDocuments({ username: new RegExp("^" + username + "$", "i") })
        .exec(function (err, count) {
          if (err) throw err;
          res.render("dashboard", {
            title: "Dashboard",
            totalpass: count,
            isLoggedIn: username,
            records: data,
          });
        });
    });
};
