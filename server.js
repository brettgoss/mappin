"use strict";
require('dotenv').config();
const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const app         = express();
const bodyParser  = require("body-parser");
const pg          = require('pg');

const morgan      = require('morgan');
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const knexLogger  = require('knex-logger');

const usersRoutes = require("./routes/users");
const mapsRoutes  = require("./routes/maps")
const favMaps     = require("./routes/favmaps")


app.set('port', (PORT));
app.use(express.static("public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(knexLogger(knex));

// const data = {};
app.use("/users", usersRoutes(knex));
app.use("/maps", mapsRoutes(knex));
app.use("/favmaps", favMaps(knex));

app.post('/register', function req, res {
  let username = req.body.username
  let password = req.body.password
})

app.post("/exports", (req, res) => {
  // $('#content').prepend(req.body);
  // var mapId = // the map id;
  // var mapJson = // the map json string

  // data[mapId] = mapJson;
})

app.get("/exports", (req, res) => {
  // var mapId = // the map id
  // var mapJson = data[mapId];
})
app.listen(app.get('port'), () => {
  console.log("Example app listening on port " + app.get('port'));
});
