const conn = require('./mysql_connection')

const model = {
  get (id, cb) {
    conn.query('SELECT * FROM Fitness_Friends WHERE Id=?', id, (err, data) => {
      cb(err, data[0])
    })
  },
  add (input, cb) {
    conn.query('INSERT INTO Fitness_Friends (user_id,user_email,created_at) VALUES (?)',
      [
        [input.user_id, input.user_email, new Date()]
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
