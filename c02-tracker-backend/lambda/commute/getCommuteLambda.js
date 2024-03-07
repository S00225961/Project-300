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
        const query = 'SELECT * FROM commutes WHERE id = ?';
        const [rows] = await connection.execute(query, [id]);
        await connection.end();

        if (rows.length > 0) {
            return {
                statusCode: 200,
                body: JSON.stringify(rows[0]),
                headers: { 'Content-Type': 'application/json' }
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Commute not found' }),
                headers: { 'Content-Type': 'application/json' }
            };
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching commute' }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
};
