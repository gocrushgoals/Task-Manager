// Import the express router
const router = require('express').Router();

// Import the user routes
const userRoutes = require('./userRoutes');

// Import the task routes
const taskRoutes = require('./taskRoutes');

// Define a route for the root path ("/")
router.get('/', (req, res) => {
    // Send a response to indicate that the server is working
    res.send('working');
});

// Use the user routes for any requests that start with "/users"
router.use('/users', userRoutes);

// Use the task routes for any requests that start with "/task"
router.use('/task', taskRoutes);

// Export the router to be used in other parts of the application
module.exports = router;
