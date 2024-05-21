// Import the Express Router
const router = require('express').Router();

// Import the API routes and home routes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// Use the homeRoutes for paths starting with '/' and apiRoutes for paths starting with '/api'
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// Export the router to be used in the main application
module.exports = router;