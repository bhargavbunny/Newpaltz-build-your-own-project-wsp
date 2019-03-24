const conn = require('./mysql_connection')

const model = {
  get (id, cb) {
    conn.query('SELECT * FROM Fitness_Exercise WHERE Id=?', id, (err, data) => {
      cb(err, data[0])
    })
  },
  add (input, cb) {
    conn.query('INSERT INTO Fitness_Exercise (exercise_id,exercise_name,created_at) VALUES (?)',
      [
        [input.exercise_id,input.exercise_name, new Date()]
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
