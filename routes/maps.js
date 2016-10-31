"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("maps")
      .then((results) => {
        res.json(results);
    });
  })
  router.post("/export", (req, res) => {
    var user = req.cookies.user;

    knex('maps')
      .insert(req.body)
      .then(() => {
        console.log(req.body)
        res.status(200).send(req.body)
      })

  })

  return router;
}
