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

  })

  return router;
}
