const express = require('express');
const cors = require('cors');
const db = require('./database');
const userRoutes = require('./routes/userRoutes');
const commuteRoutes = require('./routes/commuteRoutes');
const electricityRoutes = require('./routes/electricityRoutes');
const userController = require('../controllers/userController');


const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Database connection check
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/commutes', commuteRoutes);
app.use('/api/electricity', electricityRoutes);

// Home route for testing
app.get('/', (req, res) => res.send('CO2 Tracker API is running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
