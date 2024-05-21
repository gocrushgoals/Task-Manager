// Import the Express Router
const router = require('express').Router();

// Import the User model
const { User } = require('../../models');

// Route to create a new user
router.post('/', async (req, res) => {
    try {
        // Create a new user with the provided data
        const userData = await User.create(req.body);

        // Save user data to the session and set logged_in to true
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.email = userData.email;
            req.session.name = userData.name;
            req.session.logged_in = true;

            // Send user data as JSON response
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to log in a user
router.post('/login', async (req, res) => {
    try {
        // Find the user by email in the database
        const userData = await User.findOne({ where: { email: req.body.email } });

        // Check if user data exists
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // Check if the password provided matches the stored password
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // Save user data to the session and set logged_in to true
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.email = userData.email;
            req.session.name = userData.name;

            // Send success message and user data as JSON response
            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to log out a user
router.post('/logout', (req, res) => {
    // Check if the user is logged in, then destroy the session
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Export the router to be used in the main application
module.exports = router;