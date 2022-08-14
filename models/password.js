const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Password = new Schema({
  username: String,
  passwordName: String,
  passwordDetails: String,
  });

module.exports = mongoose.model("Password", Password);