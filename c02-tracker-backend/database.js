const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
  host: 'co2-tracker-db.cedrm6pn8lni.eu-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'mypassword',
  database: 'co2-tracker-db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

exports.listUsers = async (req, res) => {
    try {
        const [users] = await pool.query("SELECT * FROM UserProfiles");
        res.json(users);
    } catch (err) {
        console.error('Error querying the database:', err.message);
        res.json({ message: "Error querying the database" });
    }
};
