const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    const { id } = event.pathParameters; 
    const { username, email, password, givenName, familyName } = JSON.parse(event.body);
    const connection = await mysql.createConnection({
        host: 'co2-tracker-db.cedrm6pn8lni.eu-west-1.rds.amazonaws.com',
        user: 'admin',
        password: 'mypassword',
        database: 'co2-tracker-db'
    });

    try {
        // Update user information in the database
        const query = 'UPDATE UserProfiles SET username = ?, email = ?, passwordHash = ?, firstName = ?, lastName = ? WHERE userID = ?';
        await connection.execute(query, [username, email, password, givenName, familyName, id]);
        await connection.end();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User updated successfully' }),
            headers: { 'Content-Type': 'application/json' }
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error updating user', error: err.message }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
};
