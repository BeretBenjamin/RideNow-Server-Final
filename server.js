const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


// Routes
const motorcycleRoutes = require('./routes/motorcycle_routes');
const userRoutes = require('./routes/user_routes');
const routeRoutes = require('./routes/route_routes');

// App setup
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
//app.use('/upload_route', express.static('upload_route'));


// MongoDB connection
const { connectDB } = require('./config/db');
connectDB();

// API routes
app.use('/api/motorcycles', motorcycleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/routes',routeRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to RideNow API!' });
});

app.get('/api/files/:filename', (req, res) => {
  //console.log('Requested filename:', req.params.filename);
  const filePath = path.join(__dirname, '', req.params.filename);
  console.log(filePath);
  let normalizedPath = storedPath.replace(/\\/g, '/');
  console.log(normalizedPath)
  res.sendFile(filePath);
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
