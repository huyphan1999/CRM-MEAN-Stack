//BASE SETUP ===================
// ===========================

//Goi cac package can thiet
var express = require("express"); //call express
var cors = require("cors");
var app = express(); // define our app using express
var bodyParser = require("body-parser"); //get body-parser
var morgan = require("morgan"); //used to see requests
var mongoose = require("mongoose");
var config = require("./config");
var passport = require("passport");
var oauth20 = require("./passport");
//super secret for create token, student can change
//var superSecret = 'ilovescotchscotchyscotchscotch';
app.use(cors());
//App congiguration ==============================
//use body paer so we can grap infomation from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

// log all requests to the console
app.use(morgan("dev"));

mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
//ROUTES FOR OUR API
//==============================

//api endpoint to get user information

//REGISTER OUR ROUTES ------------------
var apiRouter = require("./app/routes/api")(app, express);
app.use("/api", apiRouter);

// configure our app to handle CORS-  ross-origin resource sharing requests
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );
  next();
});

//START THE SERVER
//===================================
app.listen(config.port);
console.log("Dang dung Port: " + config.port);
