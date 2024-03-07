const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    const { userID, distance, modeOfTransport, frequency, timeTaken, co2Emissions } = JSON.parse(event.body);
    const connection = await mysql.createConnection({
        host: 'co2-tracker-db.cedrm6pn8lni.eu-west-1.rds.amazonaws.com',
        user: 'admin',
        password: 'mypassword',
        database: 'co2-tracker-db'
    });

    try {
        const query = 'INSERT INTO commutes (userID, distance, modeOfTransport, frequency, timeTaken, co2Emissions) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await connection.execute(query, [userID, distance, modeOfTransport, frequency, timeTaken, co2Emissions]);
        await connection.end();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Commute entry created successfully', commuteId: result.insertId }),
            headers: { 'Content-Type': 'application/json' }
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating commute entry' }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
};
