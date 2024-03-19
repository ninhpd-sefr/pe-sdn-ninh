const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");
const config = require("./configs/index");
const session = require("express-session");
require("dotenv").config();
// init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// init session
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "somesecret",
    cookie: { maxAge: 60000 * 10 * 10 },
  })
);
// init route
app.use("/", require("./routes"));
// init mongodb
require("./db/init.mongoDB");

// init global variable
global.config = config;

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
