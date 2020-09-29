require("dotenv").config();

const { Pool } = require('pg')

module.exports = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 5432,
  database: process.env.DB_DATABASE
})