// Import the Express Router
const router = require('express').Router();

// Import userRoutes and taskRoutes for specific routes
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');

// Define a basic route to test if the router is working
router.get('/', (req, res) => {
    res.send('working');
});

// Use the userRoutes for paths starting with '/users' and taskRoutes for paths starting with '/task'
router.use('/users', userRoutes);
router.use('/task', taskRoutes);

// Export the router to be used in the main application
module.exports = router;