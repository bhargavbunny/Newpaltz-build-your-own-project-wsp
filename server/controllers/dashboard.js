const express = require('express');
const Food_List = require('../models/Daily_Food');
const Exercize = require('../models/Exercise');
const user = require('../models/user');
const sleep = require('./models/sleep_time')
const app = express.Router();

app.get("/getAll", (req, res) => {
    Food_List.getAll((err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.get("/", async (req, res, next) => {
    sleep.getAll()
    .then(x=>  res.send(x) )
    .catch(next)
});
app.get("/getAll", (req, res) => {

    Exercize.getAll((err, data) => {
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
