// Load environment variables from a .env file
require('dotenv').config();

// Import the MySQL connection pool from the 'config/database' module
const pool = require('./config/database');

// Import necessary libraries and modules
const express = require('express'); // Express framework for building web applications
const cors = require('cors'); // CORS middleware for handling cross-origin requests
const app = express(); // Create an Express application
const port = process.env.PORT; // Define the port from environment variables
const userRouter = require('./api/users/user.router'); // Import user router module
const questionRouter = require('./api/question/question.router');
const answerRouter=require('./api/answer/answer.router')

// Enable CORS for all routes in the application
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Use the user router for handling routes under "/api/users"
app.use("/api/users", userRouter);
app.use("/api/question", questionRouter);
app.use("/api/answer", answerRouter);
// Start the Express application, listening on the specified port
app.listen(port, () => console.log(`Server is listening at http://localhost:${port}`));

