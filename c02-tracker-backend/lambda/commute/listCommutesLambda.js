const mysql = require('mysql2/promise');

// Lambda handler function
exports.handler = async (event) => {
    // Establish a connection to RDS instance
    const connection = await mysql.createConnection({
        host: 'co2-tracker-db.cedrm6pn8lni.eu-west-1.rds.amazonaws.com',
        user: 'admin',
        password: 'mypassword',
        database: 'co2-tracker-db'
    });

    try {
        // Perform SQL query to fetch all commute records
        const [rows] = await connection.query('SELECT * FROM commutes');
        await connection.end(); // Close the database connection

        // Return the fetched commute records in the response
        return {
            statusCode: 200,
            body: JSON.stringify(rows),
            headers: { 'Content-Type': 'application/json' }
        };
    } catch (err) {
        // Handle any errors during the database operation
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching commutes' }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
};
