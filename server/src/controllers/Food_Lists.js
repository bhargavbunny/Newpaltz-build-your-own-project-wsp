const express = require('express')
const user = require('../models/User')

const app = express.Router()

app.get('/', (req, res) => {
  user.getAll((err, data) => {
    if (err) throw err
    res.send(data)
  })
})

app.post('/', (req, res) => {
  user.add({
    food_id: '1',
    food_portion: '0.5',
    item_calorie_amount: '10',
    food_name: 'Rice'
  }, (err, data) => {
    if (err) throw err
    res.send(data)
  })
})

module.exports = app
