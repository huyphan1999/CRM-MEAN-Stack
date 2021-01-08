var User = require("../models/user");
var jwt = require("jsonwebtoken");
var config = require("../../config");
var Admin = require("../models/admin");
var passport = require("passport");

//super secret for creating tokens
var superSecret = config.secret;

module.exports = function (app, express) {
  //Get in instance of the express router
  var apiRouter = express.Router();

  //route to authentication a user (POST http://localhost:8080/api/login)
  apiRouter.post("/login", function (req, res) {
    //find the user
    Admin.findOne({
      username: req.body.username,
    })
      .select("name username password")
      .exec(function (err, user) {
        if (err) throw err;

        console.log(user);
        //no user with that username was found
        if (!user) {
          res.json({
            success: false,
            message: "Authentication failed. User not found.",
          });
        } else if (user) {
          //check if password matches
          // console.log(User)

          var validPassword = user.comparePassword(req.body.password);

          console.log(validPassword);

          if (!validPassword) {
            res.json({
              success: false,
              message: "Authentication failed. Wrong password",
            });
          } else {
            //if user is found and password is right
            //create a token
            var token = jwt.sign(
              {
                name: user.name,
                username: user.username,
              },
              superSecret,
              {
                expiresIn: "180s", //expires in 24 hours
              }
            );

            //return the information including token as Json
            res.json({
              success: true,
              message: "User da duoc cap nhat token!",
              token: token,
            });
          }
        }
      });
  });

  apiRouter.get("/auth/facebook", passport.authenticate("facebook"));

  // the callback after facebook has authenticated the user
  apiRouter.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    function (req, res) {
      console.log("callback", req.user);
      // Successful authentication, redirect home.

      var user = req.user;
      var token = jwt.sign(
        {
          name: user.name,
          username: user.username,
        },
        superSecret,
        {
          expiresIn: "180s", //expires in 180s
        }
      );

      urlRedirect = `http://localhost:4200/login?token=${token}`;

      res.redirect(urlRedirect);
    }
  );

  apiRouter.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  // the callback after google has authenticated the user
  apiRouter.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      console.log("callback", req.user);
      // Successful authentication, redirect home.

      var user = req.user;
      var token = jwt.sign(
        {
          name: user.name,
          username: user.username,
        },
        superSecret,
        {
          expiresIn: "180s", //expires in 24 hours
        }
      );

      urlRedirect = `http://localhost:4200/login?token=${token}`;

      res.redirect(urlRedirect);
    }
  );
  // doan code nay khong che phep lam gi ma khong co token
  //route middleware to verify a token
  apiRouter.use(function (req, res, next) {
    // do logging
    console.log("Dang lam tren App!");

    //check header or url parameter or post parameters for token

    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      console.log(token);
      //decode token
      if (token) {
        //verifies secret and checks exp
        jwt.verify(token, superSecret, function (err, decoded) {
          console.log(token);
          if (err) {
            console.log(err);
            return res.status(403).send({
              success: false,
              message: "Token expired",
              status: 403,
            });
          }
          //if everthing is good, save to requests for use in other routes
          else {
            req.decoded = decoded;
            next();
          }
        });
      } else {
        //if there is no token
        // return an http response of 403 (access forbidden) and an error message
        return res.status(403).send({
          success: false,
          message: "No token provided.",
          status: 403,
        });
      }
    }

    // make sure we go to the nex routes and don't stop here
  });
  //check token code stop here
  //test route to make sure everything is working
  apiRouter.get("/", function (req, res) {
    res.json({ message: "Resful API! welcome to our api!" });
  });

  // on routes that end in/users
  //-------------------------------
  apiRouter
    .route("/users")
    // get all the users (accessed at GET http://localhost:8080/api/users)
    .get(function (req, res) {
      User.find(function (err, users) {
        if (err) res.send(err);
        //return the users
        res.json(users);
      });
    });

  apiRouter
    .route("/users/create")
    //create a user (accessed at POST http://localhost:8080/users/create)
    .post(function (req, res) {
      var user = new User(); // create a new instance of the User model
      user.name = req.body.name; //set the users name (comes from the request)
      user.status = req.body.status;
      user.contact = req.body.contact;
      user.email = req.body.email;
      user.website = req.body.website;
      user.phone = req.body.phone;
      user.address = req.body.address;
      user.notes = req.body.notes;
      user.save(function (err, document) {
        if (err) {
          //delicate entry
          if (err.code == 11000)
            return res.json({
              success: false,
              message: "A user with that username already exists",
            });
          else return res.send(err);
        }

        //return a message
        res.json({ message: "User created!", data: document });
      });
    });

  apiRouter.route("/admins/create").post(function (req, res) {
    var user = new Admin(); // create a new instance of the User model
    user.name = req.body.name; //set the users name (comes from the request)
    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function (err, document) {
      if (err) {
        //delicate entry
        if (err.code == 11000)
          return res.json({
            success: false,
            message: "A user with that username already exists",
          });
        else return res.send(err);
      }

      //return a message
      res.json({ message: "User created!", data: document });
    });
  });

  //on routes that end in /users/:user_id
  //-----------------------------
  apiRouter
    .route("/users/:user_id")

    //get the user with that id
    .get(function (req, res) {
      User.findById(req.params.user_id, function (err, user) {
        if (err) res.send(err);

        //return that user
        res.json(user);
      });
    })
    //update the user with this id
    .put(function (req, res) {
      User.findById(req.params.user_id, function (err, user) {
        if (err) res.send(err);

        //set the new user information if it exists in the request
        if (req.body.name) user.name = req.body.name;
        if (req.body.status) user.status = req.body.status;
        if (req.body.contact) user.contact = req.body.contact;
        if (req.body.email) user.email = req.body.email;
        if (req.body.website) user.website = req.body.website;
        if (req.body.phone) user.phone = req.body.phone;
        if (req.body.address) user.address = req.body.address;
        if (req.body.notes) user.notes = req.body.notes;
        if (req.body.username) user.username = req.body.username;
        if (req.body.password) user.password = req.body.password;

        //save the user
        user.save(function (err) {
          if (err) res.send(err);
          //return a message
          res.json({ message: "User Updated!" });
        });
      });
    })

    //delete the user with this id
    .delete(function (req, res) {
      User.remove(
        {
          _id: req.params.user_id,
        },
        function (err, user) {
          if (err) res.send(err);

          res.json({ message: "Successfully deleted" });
        }
      );
    });
  return apiRouter;
};
