"use strict";

const express     = require("express");
const app         = express();


app.set('port', (process.env.PORT || 8080));
app.use(express.static("public"));

app.listen(app.get('port'), () => {
  console.log("Example app listening on port " + app.get('port'));
});
