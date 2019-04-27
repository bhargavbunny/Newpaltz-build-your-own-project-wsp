const express = require('express');
const Workout = require('../models/Workout');

const app = express.Router();

app.get("/", async (req, res, next) => {
    Workout.getAll()
    .then(x=> res.send(x) )
    .catch(next)

}),
app.get("/getAll", (req, res) => { 

    Workout.getAll((err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/getID", async (req, res, next) => {
    user.getId(req.body)
    .then(x => res.send(x))
    .catch(next)
})
app.get("/getWorkout", (req, res) => {   //unique to each table

    Workout.getWorkout(req.params, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/addWorkout", (req, res) => {   //unique to each table

    console.log(req.body);
    Workout.addWorkout(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/updateWorkout", (req, res) => {   //unique to each table

    console.log(req.body);
    Workout.updateWorkout(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/deleteWorkout", (req, res) => {   //unique to each table

    console.log(req.body);
    Workout.deleteWorkout(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});

module.exports = app;
