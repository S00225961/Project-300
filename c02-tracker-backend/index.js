const express = require('express');
const cors = require('cors');
const db = require('./database');
const userRoutes = require('./routes/userRoutes');
const commuteRoutes = require('./routes/commuteRoutes');
const electricityRoutes = require('./routes/electricityRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection check
async function checkConnection() {
    try {
        await db.getConnection();
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection failed', error);
    }
}

checkConnection();

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/commutes', commuteRoutes);
app.use('/api/electricity', electricityRoutes);

// Home route for testing
app.get('/', (req, res) => res.send('CO2 Tracker API is running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
