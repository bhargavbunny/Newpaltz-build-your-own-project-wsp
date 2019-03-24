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
    exercise_id: '1',
    exercise_name: 'foot_rest'
  }, (err, data) => {
    if (err) throw err
    res.send(data)
  })
})

module.exports = app
