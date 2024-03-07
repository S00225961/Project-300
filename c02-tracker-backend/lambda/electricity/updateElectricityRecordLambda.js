const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    const { id } = event.pathParameters;  
    const { userID, usageInKwh, source, co2Emissions } = JSON.parse(event.body);
    const connection = await mysql.createConnection({
        host: 'co2-tracker-db.cedrm6pn8lni.eu-west-1.rds.amazonaws.com',
        user: 'admin',
        password: 'mypassword',
        database: 'co2-tracker-db'
    });

    try {
        const query = 'UPDATE ElectricityRecords SET userID = ?, usageInKwh = ?, source = ?, co2Emissions = ? WHERE recordID = ?';
        await connection.execute(query, [userID, usageInKwh, source, co2Emissions, id]);
        await connection.end();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Electricity record updated successfully' }),
            headers: { 'Content-Type': 'application/json' }
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error updating electricity record', error: err.message }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
};
