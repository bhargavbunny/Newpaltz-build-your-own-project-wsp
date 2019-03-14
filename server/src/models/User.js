const conn = require('./mysql_connection.js')

const model = {
  add (input, cb) {
    conn.query('INSERT INTO user (firstname,lastname,email,user_pass) VALUES (?,?,?,?)',
      [[input.email, input.F_name, input.L_name, input.password]],
      (err, data) => {
        cb(err, data)
      }
    )
  },
  getAll (cb) {
    conn.query('show tables', (err, data) => {
      cb(err, data)
    })
  }
}

module.exports = model
