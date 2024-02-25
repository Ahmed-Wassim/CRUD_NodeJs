const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "students",
  password: "1379",
  port: 5432,
});

module.exports = pool;
