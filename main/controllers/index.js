// Import the Router function from the express module
const router = require('express').Router();

// Import the API routes from the 'api' module
const apiRoutes = require('./api');

// Import the home routes from the 'homeRoutes' module
const homeRoutes = require('./homeRoutes');

// Use the homeRoutes module for handling requests to the root URL ('/')
router.use('/', homeRoutes);

// Use the apiRoutes module for handling requests to URLs that start with '/api'
router.use('/api', apiRoutes);

// Export the configured router to be used in other parts of the application
module.exports = router;
