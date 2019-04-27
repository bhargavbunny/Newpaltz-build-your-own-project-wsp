const express = require('express');
const Exercize = require('../models/Exercise');

const app = express.Router();

app.get("/", async (req, res, next) => {
    Exercize.getAll()
    .then(x=> res.send(x) )
    .catch(next)

}),
app.get("/getAll", (req, res) => {

    Exercize.getAll((err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/getID", async (req, res, next) => {
    user.getId(req.body)
    .then(x => res.send(x))
    .catch(next)
})
app.get("/getExercise", (req, res) => {   //unique to each table

    Exercize.getExercise(req.params, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/addExercise", (req, res) => {   //unique to each table

    console.log(req.body);
    Exercize.addExercise(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/updateExercise", (req, res) => {   //unique to each table

    console.log(req.body);
    Exercize.updateExercise(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/deleteExercise", (req, res) => {   //unique to each table

    console.log(req.body);
    Exercize.deleteExercise(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});

module.exports = app;