const express = require('express');
const Food_List = require('../models/Daily_Food');
const Exercise = require('../models/Exercise');
const user = require('../models/user');
const sleep = require('./models/sleep_time')
const app = express.Router();

app.get("/Daily_Food", (req, res) => {
    Food_List.getAll((err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.get("/sleep", async (req, res, next) => {
    sleep.getAll()
    .then(x=>  res.send(x) )
    .catch(next)
});
app.get("/Exercise", (req, res) => {

    Exercise.getAll((err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.get("/", async (req, res, next) => {
    user.getAll()
    .then(x=>  res.send(x) )
    .catch(next)
});

module.exports = app;
