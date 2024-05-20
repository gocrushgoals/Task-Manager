// Define a middleware function named 'withAuth'
const withAuth = (req, res, next) => {
    // Check if the user is not logged in by looking at the 'logged_in' property of the session object
    if (!req.session.logged_in) {
        // If the user is not logged in, redirect them to the login route
        res.redirect('/login');
    } else {
        // If the user is logged in, proceed to the next middleware function or route handler
        next();
    }
};

// Export the 'withAuth' function so it can be used in other parts of the application
module.exports = withAuth;
