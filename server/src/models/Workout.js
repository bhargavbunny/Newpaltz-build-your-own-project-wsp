const conn = require('./mysql_connection')

const model = {
  get (id, cb) {
    conn.query('SELECT * FROM Fitness_Workout WHERE Id=?', id, (err, data) => {
      cb(err, data[0])
    })
  },
  add (input, cb) {
    conn.query('INSERT INTO Fitness_Workout (user_id,date,calories_burned,workout_minutes,created_at) VALUES (?)',
      [
        [input.user_id, input.date, input.calories_burned, input.workout_minutes, new Date()]
      ],
      (err, data) => {
        if (err) {
          cb(err)
          return
        }
        model.get(data.insertId, (err, data) => {
          cb(err, data)
        })
      }
    )
  }
}

module.exports = model
