require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login");
var registerRouter = require("./routes/register");
var profileRouter = require("./routes/profile");
var adminRouter = require("./routes/admin");
var jadwalRouter = require("./routes/jadwal");
var volunteerRouter = require("./routes/volunteer");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/v1/auth/login", loginRouter);
app.use("/v1/auth/register", registerRouter);
app.use("/v1/user/userProfile", profileRouter);
app.use("/v1/admin", adminRouter);
app.use("/v1/user/jadwal", jadwalRouter);
app.use("/v1/user/volunteer", volunteerRouter);

module.exports = app;
