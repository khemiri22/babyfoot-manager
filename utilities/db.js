const { Pool } = require("pg");

// Create a connection pool
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
    ssl: true
});

// Export a query function
module.exports = {
    query: (text, params) => pool.query(text, params)
};
