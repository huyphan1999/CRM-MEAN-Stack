// JavaScript source code
// grab the packages that we need for the user model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

// user schema
var UserSchema = new Schema({
  name: String,
  status: String,
  contact: String,
  email: String,
  website: String,
  phone: String,
  address: String,
  notes: String,
});

// return the model
module.exports = mongoose.model("User", UserSchema);
