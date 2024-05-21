// Import the Express framework
const express = require('express');

// Create a new router using the express.Router() method
const router = express.Router();

// Import the taskController for handling task-related logic
const taskController = require('./taskController');

// Use the taskController for paths starting with '/api'
router.use('/api', taskController);

// Export the router to be used in other parts of the application
module.exports = router;