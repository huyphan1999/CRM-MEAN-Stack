// JavaScript source code
// grab the packages that we need for the user model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

// user schema
var AdminSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    googleId: { type: String },
    facebookId: { type: String },
    email: { type: String },
  },
  { strict: false }
);

// hash the password before the user is saved
AdminSchema.pre("save", function (next) {
  var user = this;
  // hash the password only if the password has been changed or user is new
  if (!user.isModified("password")) return next();

  // generate the hash
  bcrypt.hash(user.password, null, null, function (err, hash) {
    if (err) return next(err);

    // change the password to the hashed version
    user.password = hash;
    next();
  });
});

// method to compare a given password with the database hash
AdminSchema.methods.comparePassword = function (password) {
  var admin = this;

  console.log(password, admin.password);

  return bcrypt.compareSync(password, admin.password);
};

// return the model
module.exports = mongoose.model("Admin", AdminSchema);
