const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Initialize Express App
const app = express();
const PORT = 5000; // The port your frontend is expecting

// --- Middleware ---

// Enable Cross-Origin Resource Sharing (CORS)
// This allows your React frontend (running on a different port) to make requests to this backend.
app.use(cors());

// --- Data Loading ---
// We'll read the data once when the server starts.
let schemesData = [];
try {
  // Resolve the path to your main JSON data file. Assumes it's in the same directory.
  const filePath = path.resolve(__dirname, 'schemes_data.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  schemesData = JSON.parse(fileContent);
  console.log('Successfully loaded schemes data.');
} catch (error) {
  console.error('Error loading schemes_data.json:', error.message);
  // Keep the server running, but the API will return an empty list.
}


// --- API Endpoint ---
app.get('/api/schemes', (req, res) => {
  /**
   * Endpoint to get the list of all schemes.
   */
  if (schemesData.length === 0) {
    // If data failed to load, send an appropriate error response.
    return res.status(500).json({ error: 'Scheme data could not be loaded.' });
  }
  // Send the pre-loaded data as a JSON response.
  res.json(schemesData);
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
