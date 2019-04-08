const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
  //user: 'myuser',
  //host: 'localhost',
  //database: 'test',
  //password: '1234',
  //port: '5432'
})

module.exports = {
  pool,
}
