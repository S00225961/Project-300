const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    const { username, email, password, givenName, familyName } = JSON.parse(event.body);
    const connection = await mysql.createConnection({
        host: 'co2-tracker-db.cedrm6pn8lni.eu-west-1.rds.amazonaws.com',
        user: 'admin',
        password: 'mypassword',
        database: 'co2-tracker-db'
    });

    try {
        const query = 'INSERT INTO UserProfiles (username, email, passwordHash, firstName, lastName) VALUES (?, ?, ?, ?, ?)';
        const [result] = await connection.execute(query, [username, email, password, givenName, familyName]);
        await connection.end();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User created successfully', userId: result.insertId }),
            headers: { 'Content-Type': 'application/json' }
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating user', error: err.message }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
};
