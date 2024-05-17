// Import the express router and User model
const router = require('express').Router();
const { User } = require('../../models');

// Define a POST route for creating a new user
router.post('/', async (req, res) => {
    try {
        // Create a new user using the data in the request body
        const userData = await User.create(req.body);

        // Save the user's data in the session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.email = userData.email;
            req.session.name = userData.name;
            req.session.logged_in = true;

            // Respond with a status of 200 and the user's data in JSON format
            res.status(200).json(userData);
        });
    } catch (err) {
        // If an error occurs, respond with a status of 400 and the error in JSON format
        res.status(400).json(err);
    }
});

// Define a POST route for logging in a user
router.post('/login', async (req, res) => {
    try {
        // Find a user with the email provided in the request body
        const userData = await User.findOne({ where: { email: req.body.email } });

        // If no user is found, respond with a status of 400 and an error message in JSON format
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // Check if the password provided in the request body matches the user's password
        const validPassword = await userData.checkPassword(req.body.password);

        // If the password is incorrect, respond with a status of 400 and an error message in JSON format
        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // Save the user's data in the session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.email = userData.email;
            req.session.name = userData.name;

            // Respond with the user's data and a success message in JSON format
            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        // If an error occurs, respond with a status of 400 and the error in JSON format
        res.status(400).json(err);
    }
});

// Define a POST route for logging out a user
router.post('/logout', (req, res) => {
    // If the user is logged in
    if (req.session.logged_in) {
        // Destroy the session and respond with a status of 204
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        // If the user is not logged in, respond with a status of 404
        res.status(404).end();
    }
});

// Export the router
module.exports = router;
