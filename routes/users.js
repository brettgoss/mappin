"use strict";

const express = require('express');
const router  = express.Router();
const cookieParser = require('cookie-parser');

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
  let username = req.body.username
  res.cookie('users', username)
  res.redirect("/")
})
router.post("/logout", (req, res) => {
  delete res.clearCookie("user")
  res.redirect("/")
})
  return router;
}
