const { createPool } = require("mysql");

const pool = createPool({
    port:3306,
    host:"127.0.0.1",
    user:"user",
    password:"user",
    database:"ach2",
    connectionLimit: 10
});

module.exports = pool;