const Pool = require("pg").Pool
require("dotenv").config()

const pool = new Pool({
    user: "postgres",
    password: "apple",
    host: "localhost",
    port: 5432,
    database: "skillswap",
});

module.exports = pool;