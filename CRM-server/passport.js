// config/passport.js

// load những thứ chúng ta cần
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;

// Lấy thông tin những giá trị auth
var configAuth = require("./config");

// load  user model
var User = require("./app/models/admin");

var passport = require("passport");

passport.serializeUser(function (user, done) {
  console.log("serializeUser");
  done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
  console.log("deserializeUser");
  User.findById(id, function (err, user) {
    done(null, user);
  });
});

// =========================================================================
// GOOGLE ==================================================================
// =========================================================================
passport.use(
  new GoogleStrategy(
    {
      clientID: configAuth.googleAuth.clientID,
      clientSecret: configAuth.googleAuth.clientSecret,
      callbackURL: configAuth.googleAuth.callbackURL,
    },
    function (token, refreshToken, profile, done) {
      User.findOne({ googleId: profile.id }, function (err, user) {
        if (err) return done(err);

        if (user) {
          // if a user is found, log them in
          return done(null, user);
        } else {
          // if the user isnt in our database, create a new user
          var newUser = new User();

          console.log(profile);

          // set all of the relevant information
          newUser.username = profile.emails[0].value || "default";
          newUser.password = profile.id;
          newUser.googleId = profile.id;

          // save the user
          newUser.save(function (err) {
            if (err) throw err;
            return done(null, newUser);
          });
        }
      });
    }
  )
);

// =========================================================================
// Facebook ==================================================================
// =========================================================================
passport.use(
  new FacebookStrategy(
    {
      clientID: configAuth.facebookAuth.clientID,
      clientSecret: configAuth.facebookAuth.clientSecret,
      callbackURL: configAuth.facebookAuth.callbackURL,
    },
    function (token, refreshToken, profile, done) {
      User.findOne({ facebookId: profile.id }, function (err, user) {
        if (err) return done(err);

        if (user) {
          // if a user is found, log them in
          return done(null, user);
        } else {
          // if the user isnt in our database, create a new user
          var newUser = new User();

          console.log(profile);

          // set all of the relevant information
          newUser.username = "fbUser";
          newUser.password = profile.id;
          newUser.facebookId = profile.id;

          // save the user
          newUser.save(function (err) {
            if (err) throw err;
            return done(null, newUser);
          });
        }
      });
    }
  )
);
