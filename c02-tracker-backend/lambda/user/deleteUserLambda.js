const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    const { id } = event.pathParameters;
    const connection = await mysql.createConnection({
        host: 'co2-tracker-db.cedrm6pn8lni.eu-west-1.rds.amazonaws.com',
        user: 'admin',
        password: 'mypassword',
        database: 'co2-tracker-db'
    });

    try {
        const query = 'DELETE FROM UserProfiles WHERE id = ?';
        await connection.execute(query, [id]);
        await connection.end();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User deleted successfully' }),
            headers: { 'Content-Type': 'application/json' }
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting user', error: err.message }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
};
