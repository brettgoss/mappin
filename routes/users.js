"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  })
  router.post("/register", (req, res) => {
    knex('users')
      .insert(req.body)
      .then(() => {
        console.log(req.body)
        res.redirect('/')
      })
  });
  router.post("/login", (req, res) => {
    var user = req.body.username;
    var pass = req.body.password;
    knex
      .select('*')
      .from("users")
      .where({
        username: user
      })
      .then(function (result){
          if(result[0].username == user && result[0].password == pass) {
            var uid = result[0].id;
            console.log("Yep")
            res.cookie('userid', uid);
            res.cookie('username', user);
            res.redirect("/");
          } else {
            console.log("Fail")
            res.redirect("/");
          }

      })
      .catch(function (err){
        console.log("error", err);
        res.redirect("/");
      })
    })

  router.post("/logout", (req, res) => {
    delete res.clearCookie("username")
    delete res.clearCookie("userid")

    res.redirect("/")
  })
  return router;
}
