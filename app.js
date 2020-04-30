const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const conn = require("./db");

//Authentication Packages
const session = require("express-session");
const passport = require("passport");
const mySqlStore = require("express-mysql-session");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const fileupload = require("express-fileupload");

const app = express();

app.use(cors());
app.use(fileupload());
require("dotenv").config();

//view engine setup
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "views")));

//body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(express.static(path.join(__dirname, "public")));

const options = {
  host: "localhost",
  user: "root",
  password: "khatri",
  database: "kadb"
};

const sessionStore = new mySqlStore(options);
app.use(
  session({
    secret: "keyboard categ",
    resave: false,
    store: sessionStore,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});
//define routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/farmer", require("./routes/farmer"));
app.use("/team", require("./routes/team"));
app.use("/manufacturer", require("./routes/manufacturer"));
app.use("/supplier", require("./routes/supplier"));
app.use("/buyer", require("./routes/buyer"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started at port ${PORT}`));
