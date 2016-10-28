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


app.listen(app.get('port'), () => {
  console.log("Example app listening on port " + app.get('port'));
});

app.post("/exports", (req, res) => {
  // $('#content').prepend(req.body);
})
app.get("/exports", (req, res) => {
  res
})
