const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./connection/connection');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;


// Middleware setup
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// CORS setup
// app.use(cors({
//   origin: "http://localhost:5173", // Replace with your frontend's URL
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true, // Allow cookies if needed
// }));
app.use(cors({
  origin: "https://e-digital-e-gram-panchayat-client.vercel.app", // Your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Static files
app.use('/public', express.static(path.join(__dirname, 'public')));

const auth = require('./routes/auth');
// Import routes
app.use('/auth', auth);
app.use("/services", require("./routes/service"));
app.use("/applications", require("./routes/application"));

// Start the server
app.listen(port, (err) => {
  if (err) {
    console.error(`Failed to start server: ${err.message}`);
     }
  console.log(`Server is listening on Port ${port}`);
});
