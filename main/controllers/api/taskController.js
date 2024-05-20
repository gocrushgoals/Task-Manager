// Import the express module, which is a web application framework for Node.js
const express = require('express');

// Create a new router object from express. This object can be used to define and handle various routes in your application.
const router = express.Router();

// Import the task controller module.
const taskController = require('./taskController');

// Use the task controller for all routes starting with '/api'. This means that any request starting with '/api' will be handled by the taskController.
router.use('/api', taskController);

// Export the router object to be used in other modules. This allows other parts of your application to use the routes defined in this module.
module.exports = router;
