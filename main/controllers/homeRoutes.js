// Importing required modules and functions
const router = require('express').Router(); // Importing the Router function from the express module
const { User, Task } = require('../models'); // Importing the User and Task models from the models directory
const withAuth = require('../utils/auth'); // Importing the withAuth middleware from the utils directory

// Defining a route for the homepage
router.get('/', withAuth, async (req, res) => { // This route is protected by the withAuth middleware
    try {
        // Fetching user data from the database
        const userData = await User.findByPk(req.session.user_id, { // Finding a user by their primary key (id)
            attributes: { exclude: ['password'] }, // Excluding the password attribute from the returned data
            include: [ // Including associated data
                {
                    model: Task, // Including tasks associated with the user
                    include: [{ model: User, attributes: ['id', 'name', 'email'] }], // Including user data associated with each task
                },
            ],
            order: [ // Ordering the included tasks
                [Task, 'priority', 'DESC'], // First by priority in descending order
                [Task, 'due_date', 'ASC'], // Then by due date in ascending order
            ],
        });

        // Converting the user data to a plain object
        const user = userData.get({ plain: true });

        // Logging the user data
        console.log('------HOMEPAGE HERE--------');
        console.log(user);

        // Rendering the homepage view with the user data
        res.render('homepage', {
            ...user, // Spreading the user data
            logged_in: req.session.logged_in, // Adding a logged_in property based on the session data
        });
    } catch (err) { // Catching any errors
        console.log(err); // Logging the error
        res.status(500).json(err); // Responding with a 500 status code and the error
    }
});



// If in case you want to get all the seeded data, here is the code
// router.get('/', withAuth, async (req, res) => {
//     try {
//         const taskData = await Task.findAll({
//             attributes: [
//                 'id',
//                 'name',
//                 'description',
//                 'priority',
//                 'due_date',
//                 'notification',
//                 'user_id',
//             ],
//             order: [
//                 ['priority', 'DESC'],
//                 ['due_date', 'ASC'],
//             ],
//             include: [{ model: User, attributes: ['id', 'name', 'email'] }],
//         });

//         const tasks = taskData.map((task) => task.get({ plain: true }));
//         console.log('------HOMEPAGE HERE--------');
//         console.log(tasks);

//         res.render('homepage', {
//             tasks,
//             logged_in: req.session.logged_in,
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

// Route to add task
router.get('/task/:id', withAuth, async (req, res) => {
    try {
        const taskData = await Task.findByPk(req.params.id);

        const task = taskData.get({ plain: true });
        console.log(task);

        res.render('task', {
            task,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Route to get a specific task by its ID
router.get('/task/:id', withAuth, async (req, res) => {
    try {
        // Fetch the task data from the database using the ID from the request parameters
        const taskData = await Task.findByPk(req.params.id);

        // Convert the task data into a plain object
        const task = taskData.get({ plain: true });
        console.log(task);

        // Render the 'task' view with the task data and the login status
        res.render('task', {
            task,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        // Log any errors and send a 500 status code with the error message
        console.log(err);
        res.status(500).json(err);
    }
});

// Route to edit a specific task by its ID
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        // Fetch the task data from the database using the ID from the request parameters
        const taskData = await Task.findByPk(req.params.id);

        // Convert the task data into a plain object
        const task = taskData.get({ plain: true });
        console.log(task);

        // Render the 'edit' view with the task data and set the login status to true
        res.render('edit', {
            ...task,
            logged_in: true,
        });
    } catch (err) {
        // Log any errors and send a 500 status code with the error message
        console.log(err);
        res.status(500).json(err);
    }
});

// Route to get tasks with high priority
router.get('/highPriority', withAuth, async (req, res) => {
    try {
        // Fetch the user data from the database using the user ID from the session
        // Exclude the password from the attributes and include tasks with high priority
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Task,
                    where: { priority: true },
                    required: false,
                },
            ],
            order: [[Task, 'due_date', 'ASC']],
        });

        // Convert the user data into a plain object
        const user = userData.get({ plain: true });
        console.log('------HIGH PRIORITY HERE--------');
        console.log(user);

        // Render the 'highPriority' view with the user data and the login status
        res.render('highPriority', {
            ...user,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        // Log any errors and send a 500 status code with the error message
        console.log(err);
        res.status(500).json(err);
    }
});

// Route to get tasks with low priority
router.get('/lowPriority', withAuth, async (req, res) => {
    try {
        // Fetch the user data from the database using the user ID from the session
        // Exclude the password from the attributes and include tasks with low priority
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Task,
                    where: { priority: false },
                    required: false,
                },
            ],
            order: [[Task, 'due_date', 'ASC']],
        });

        // Convert the user data into a plain object
        const user = userData.get({ plain: true });
        console.log('------LOW PRIORITY HERE--------');
        console.log(user);

        // Render the 'lowPriority' view with the user data and the login status
        res.render('lowPriority', {
            ...user,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        // Log any errors and send a 500 status code with the error message
        console.log(err);
        res.status(500).json(err);
    }
});

// Route to get tasks that are due soon
router.get('/dueSoon', withAuth, async (req, res) => {
    try {
        // Fetch the user data from the database using the user ID from the session
        // Exclude the password from the attributes and include all tasks
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Task }],
            order: [[Task, 'due_date', 'ASC']],
        });

        // Convert the user data into a plain object
        const user = userData.get({ plain: true });
        console.log('------DUE SOON HERE--------');
        console.log(user);

        // Render the 'dueSoon' view with the user data and the login status
        res.render('dueSoon', {
            ...user,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        // Log any errors and send a 500 status code with the error message
        console.log(err);
        res.status(500).json(err);
    }
});

// Route to handle login requests
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    // Render the 'login' view
    res.render('login');
});

// Export the router to be used in other parts of the application
module.exports = router;

