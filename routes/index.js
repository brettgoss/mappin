"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    console.log("this should log")
    
    let username = req.cookies.user;
    if(!username){
      console.log(username)
      res.redirect('/maps')
    }
  })

  return router;
}
