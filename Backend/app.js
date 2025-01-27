const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./connection/connection');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

// Import routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/services", require("./routes/service"));
app.use("/api/applications", require("./routes/application"));

// Middleware setup
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS setup


app.use(cors({
  // origin: 'https://lifescape-blogapp-client.vercel.app', // Frontend URL
  credentials: true, // Allow cookies/auth headers
}));


// Static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(port, (err) => {
  if (err) {
    console.error(`Failed to start server: ${err.message}`);
     }
  console.log(`Server is listening on Port ${port}`);
});
