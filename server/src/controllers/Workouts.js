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
    user_id: '1',
    calories_burned: '12',
    workout_minutes: '2'
  }, (err, data) => {
    if (err) throw err
    res.send(data)
  })
})

module.exports = app
