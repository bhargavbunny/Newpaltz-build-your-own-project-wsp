const express = require('express');
const Food_List = require('../models/Daily_Food');

const app = express.Router();

app.get("/", async (req, res, next) => {
    Daily_Food.getAll()
    .then(x=> res.send(x) )
    .catch(next)

}),
app.get("/getAll", (req, res) => {

    Daily_Food.getAll((err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.get("/get", (req, res) => {   //unique to each table

    Daily_Food.get(req.params, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/getID", async (req, res, next) => {
    user.getId(req.body)
    .then(x => res.send(x))
    .catch(next)
})
app.post("/add", (req, res) => {   //unique to each table

    console.log(req.body);
    Daily_Food.add(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/updateDailyFoods", (req, res) => {   //unique to each table

    console.log(req.body);
    Daily_Food.updateDailyFoods(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/deleteDailyFoods", (req, res) => {   //unique to each table

    console.log(req.body);
    Daily_Food.deleteDailyFoods(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.get("/getTotalCalories", (req, res) => {   //unique to each table

    console.log(req.body);
    Daily_Food.getTotalCalories(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/addFoodItems", (req, res) => {   //unique to each table

    console.log(req.body);
    Daily_Food.addFoodItems(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/deleteFoodItems", (req, res) => {   //unique to each table

    console.log(req.body);
    Daily_Food.deleteFoodItems(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});

module.exports = app;