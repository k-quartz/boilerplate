const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");

//Authentication Packages
const session = require("express-session");
const passport = require("passport");

const app = express();

require("dotenv").config();

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "views")));

//body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});
//define routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started at port ${PORT}`));
