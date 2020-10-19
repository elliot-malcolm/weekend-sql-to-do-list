const pg = require('pg');

const Pool = pg.Pool;
const pool = new Pool({
    database: "to_do",
    host: "localhost",
    port: 5432,
    max: 10, 
    idleTimeoutMillis: 30000 
});

pool.on('connect', () => {
    console.log("pool Connected");
} );

pool.on('error', (error) => {
    console.log("error with Postgresl pool", error);
});

module.exports = pool;
