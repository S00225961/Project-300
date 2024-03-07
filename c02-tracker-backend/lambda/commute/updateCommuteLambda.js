const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    const { id } = event.pathParameters;
    const { userID, distance, modeOfTransport, frequency, timeTaken, co2Emissions } = JSON.parse(event.body);
    const connection = await mysql.createConnection({
        host: 'co2-tracker-db.cedrm6pn8lni.eu-west-1.rds.amazonaws.com',
        user: 'admin',
        password: 'mypassword',
        database: 'co2-tracker-db'
    });

    try {
        const query = 'UPDATE CommuteRecords SET userID = ?, distance = ?, modeOfTransport = ?, frequency = ?, timeTaken = ?, co2Emissions = ? WHERE commuteID = ?'; 
        const [result] = await connection.execute(query, [userID, distance, modeOfTransport, frequency, timeTaken, co2Emissions, id]);
        await connection.end();

        if (result.affectedRows > 0) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Commute updated successfully' }),
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
            body: JSON.stringify({ message: 'Error updating commute' }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
};
