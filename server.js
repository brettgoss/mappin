"use strict";
require('dotenv').config();
const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV  || "development";
const express     = require("express");
const app         = express();
const bodyParser  = require("body-parser");
const pg          = require('pg');
const ejs         = require('ejs');

const morgan      = require('morgan');
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const knexLogger  = require('knex-logger');

const cookieParser= require('cookie-parser');
const index       = require("./routes/index");
const usersRoutes = require("./routes/users");
const mapsRoutes  = require("./routes/maps");
const favMaps     = require("./routes/favmaps");
require("./public/scripts/mapfunc.js")

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');
app.set('port', (PORT));
app.use(express.static("public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(knexLogger(knex));
app.use(cookieParser());
// const data = {};
// app.use("/", index(knex));
app.use("/users", usersRoutes(knex));
app.use("/maps", mapsRoutes(knex));
app.use("/favmaps", favMaps(knex));

app.get("/", (req, res) => {

  let userid = req.cookies.userid;
  let username = req.cookies.username;

  let templateVars = {
    login: userid,
    username: username
  };
  if(!userid){
    console.log("not logged in")
  }
  if(userid){
    console.log(userid)
  }
  res.render("index", templateVars)

})

app.listen(app.get('port'), () => {
  console.log("Example app listening on port " + app.get('port'));
});
