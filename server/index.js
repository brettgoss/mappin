"use strict";
require('dotenv').config();
const express     = require("express");
const app         = express();
const bodyParser  = require("body-parser");
const pg          = require('pg');
const ENV         = process.env.ENV || "development";


app.set('port', (process.env.PORT || 8080));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// const data = {};


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
