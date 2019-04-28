const express = require('express');
const user = require('../models/user_profile');

const app = express.Router();

app.post("/profile", (req, res, next) => {
    user.addprofile(req.body)
    .then(x=>  res.send(x) )
    .catch(next)
}),
app.post("/updateprofile", (req, res, next) => {
    user.updateprofile(req.body)
    .then(x=>  res.send(x) )
    .catch(next)
}),


module.exports = app;