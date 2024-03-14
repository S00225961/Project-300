const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    const connection = await mysql.createConnection({
        host: 'co2-tracker-db.cedrm6pn8lni.eu-west-1.rds.amazonaws.com',
        user: 'admin',
        password: 'mypassword',
        database: 'co2-tracker-db'
    });

    try {
        const [rows] = await connection.query('SELECT * FROM UserProfiles');
        await connection.end();

        return {
            statusCode: 200,
            body: JSON.stringify(rows),
            headers: { 'Content-Type': 'application/json' }
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving users' }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
};
