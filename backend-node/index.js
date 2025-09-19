require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes'); // Import the router

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Main API Route ---
// Tell the app to use your router for any URL starting with /api
app.use('/api', apiRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('SIH Backend Server is running!');
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});