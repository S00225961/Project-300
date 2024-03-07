const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    const { userID, usageInKwh, source, co2Emissions } = JSON.parse(event.body);
    const connection = await mysql.createConnection({
        host: 'co2-tracker-db.cedrm6pn8lni.eu-west-1.rds.amazonaws.com',
        user: 'admin',
        password: 'mypassword',
        database: 'co2-tracker-db'
    });

    try {
        const query = 'INSERT INTO ElectricityRecords (userID, usageInKwh, source, co2Emissions) VALUES (?, ?, ?, ?)';
        const results = await connection.execute(query, [userID, usageInKwh, source, co2Emissions]);
        await connection.end();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Electricity record created successfully' }),
            headers: { 'Content-Type': 'application/json' }
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating electricity record', error: err.message }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
};
