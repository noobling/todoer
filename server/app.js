var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var proxy = require('http-proxy-middleware');

var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");

require("dotenv").config();
require("./models/db");
require('./config/passport');
const cors = require('cors');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({credentials: true, origin: 'http://localhost:8080'}));
app.use('/api/avatars', proxy({target: 'https://ui-avatars.com/api/', changeOrigin: true}));

app.use(
  require("express-session")({
    secret: process.env.secret,
    resave: true,
    saveUninitialized: true
  })
);
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index', {'title': 'good'})
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
