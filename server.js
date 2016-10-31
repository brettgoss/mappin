"use strict";

// Require dotenv to get config vars
require('dotenv').config({silent: true});

// Checking .env for App port and environment.
// If none found, use default values.
const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV  || "development";

// Requiring Express and server dependencies
const express      = require("express");
const bodyParser   = require("body-parser");
const cookieParser = require('cookie-parser');
const ejs          = require('ejs');

// Requiring database dependencies
const pg           = require('pg');
const knexConfig   = require("./knexfile");
const knex         = require("knex")(knexConfig[ENV]);

// Logging and terminal dependencies
const morgan       = require('morgan');
const knexLogger   = require('knex-logger');

// Defining app routes
const usersRoutes  = require("./routes/users");
const mapsRoutes   = require("./routes/maps");
const favMaps      = require("./routes/favmaps");

// Setting app to use Express
const app          = express();

// Configuring app
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');
app.set('port', (PORT));

// Telling express to use the /public folder as default route
app.use(express.static("public"));

// Configuring Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(knexLogger(knex));

// Setting app to use routes defined above
app.use("/users",   usersRoutes(knex));
app.use("/maps",    mapsRoutes(knex));
app.use("/favmaps", favMaps(knex));


// Using EJS to request login cookies on index page load,
// and if found, pass the cookies to the client's DOM.
app.get("/", (req, res) => {

  let userid = req.cookies.userid;
  let username = req.cookies.username;

  let templateVars = {
    login: userid,
    username: username
  };

  res.render("index", templateVars)

})

app.listen(app.get('port'), () => {
  console.log("Example app listening on port " + app.get('port'));
});
