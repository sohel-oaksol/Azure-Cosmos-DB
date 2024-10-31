// app.js
require('dotenv').config();
const express = require('express');
const app = express();
const itemsRoutes = require('./routes/itemsRoutes');

app.use(express.json()); // Middleware to parse JSON bodies

// Use the items routes
app.use('/api/items', itemsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
