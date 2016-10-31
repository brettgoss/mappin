"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const salt    = bcrypt.genSaltSync(10);

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
    var user = req.body.username;
    var pass = req.body.password;
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(pass, salt, function(err, hash) {
        knex('users')
          .insert({
            username: user,
            password: hash
          })
        .then(() => {
          knex
            .select('*')
            .from("users")
            .where({
              username: user
            })
          .then(function (result){
            var uid = result[0].id;
              console.log("Yep")
              res.cookie('userid', uid);
              res.cookie('username', user);
              res.redirect("/");
          })
        })
      });
    });
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
        bcrypt.compare(pass, result[0].password, function(err, results) {
          if(result[0].username == user && results) {
            var uid = result[0].id;
            console.log("Yep")
            res.cookie('userid', uid);
            res.cookie('username', user);
            res.redirect("/");
          } else {
            console.log("Invalid Credentials")
            res.redirect("/");
          }
        })

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
