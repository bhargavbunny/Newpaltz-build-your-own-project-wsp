const conn = require('./mysql_connection')

const model = {
  get (id, cb) {
    conn.query('SELECT * FROM Fitness_Calorie WHERE Id=?', id, (err, data) => {
      cb(err, data[0])
    })
  },
  add (input, cb) {
    conn.query('INSERT INTO Fitness_Calorie (user_id,calorie_total,date,created_at) VALUES (?)',
      [
        [input.user_id, input.calorie_total, input.date, new Date()]
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
