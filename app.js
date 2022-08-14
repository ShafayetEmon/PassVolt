const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");

const dashboardRoute = require("./routes/dashboardRoute");
const loginRoute = require("./routes/loginRoute");
const signupRoute = require("./routes/signupRoute");
const passwordRoute = require("./routes/passwordRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "2e0K^E2tiAbm",
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");
app.set("views", "views");

app.use(loginRoute);
app.use(signupRoute);
app.use(dashboardRoute);
app.use(passwordRoute);
app.get("/", (req, res, next) => {
  res.render("home", {
    title: "PassVolt",
    msg: "",
    isLoggedIn: "",
  });
});


const url = "mongodb://localhost:27017/passDB";
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    const port = process.env.PORT || 8080;

    app.listen(port, () => {
      console.log("Server is running " + port);
      console.log("Database connect..");
    });
  })
  .catch((e) => {
    return console.log(e);
  });
