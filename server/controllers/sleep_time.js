const express = require('express');
const user = require('../models/sleep_time');

const app = express.Router();

app.post("/sleep", (req, res, next) => {
    user.addsleep(req.body)
    .then(x=>  res.send(x) )
    .catch(next)
}),
app.post("/updatesleep", (req, res, next) => {
    user.updatesleep(req.body)
    .then(x=>  res.send(x) )
    .catch(next)
}),


module.exports = app;