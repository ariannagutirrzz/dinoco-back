// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize environment variables
dotenv.config();

// Create the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoints
app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: 'Product 1', price: 10, quantity: 100 },
    { id: 2, name: 'Product 2', price: 20, quantity: 200 },
  ]);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
