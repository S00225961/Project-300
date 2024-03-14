const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'co2-tracker-db.cedrm6pn8lni.eu-west-1.rds.amazonaws.com',
    user: 'admin',
    password: 'mypassword',
    database: 'co2-tracker-db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
