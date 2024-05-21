// Import necessary packages
const router = require('express').Router();
const { User, Task } = require('../models');
const withAuth = require('../utils/auth');

// Homepage route to display user tasks
router.get('/', withAuth, async (req, res) => {
    try {
        // Find user data by ID with associated tasks
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Task,
                    include: [{ model: User, attributes: ['id', 'name', 'email'] }],
                },
            ],
            order: [
                [Task, 'priority', 'DESC'],
                [Task, 'due_date', 'ASC'],
            ],
        });

        const user = userData.get({ plain: true });
        console.log('------HOMEPAGE HERE--------');
        console.log(user);

        // Render the 'homepage' template with user and task data
        res.render('homepage', {
            ...user,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
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

// Route to view a specific task by ID
router.get('/task/:id', withAuth, async (req, res) => {
    try {
        // Find the task data by ID
        const taskData = await Task.findByPk(req.params.id);
        const task = taskData.get({ plain: true });
        console.log(task);

        // Render the 'task' template with task data
        res.render('task', {
            task,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Route to edit a specific task by ID
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        // Find the task data by ID for editing
        const taskData = await Task.findByPk(req.params.id);
        const task = taskData.get({ plain: true });
        console.log(task);

        // Render the 'edit' template with task data for editing
        res.render('edit', {
            ...task,
            logged_in: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Route to view high priority tasks
router.get('/highPriority', withAuth, async (req, res) => {
    try {
        // Find user data with high priority tasks
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
        const user = userData.get({ plain: true });
        console.log('------HIGH PRIORITY HERE--------');
        console.log(user);

        // Render the 'highPriority' template with user data
        res.render('highPriority', {
            ...user,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Route to view low priority tasks
router.get('/lowPriority', withAuth, async (req, res) => {
    try {
        // Find user data with low priority tasks
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
        const user = userData.get({ plain: true });
        console.log('------LOW PRIORITY HERE--------');
        console.log(user);

        // Render the 'lowPriority' template with user data
        res.render('lowPriority', {
            ...user,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Route to view tasks due soon
router.get('/dueSoon', withAuth, async (req, res) => {
    try {
        // Find user data with tasks due soon
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Task }],
            order: [[Task, 'due_date', 'ASC']],
        });
        const user = userData.get({ plain: true });
        console.log('------DUE SOON HERE--------');
        console.log(user);

        // Render the 'dueSoon' template with user data
        res.render('dueSoon', {
            ...user,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Redirect to homepage if already logged in
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    // Render the 'login' template
    res.render('login');
});

// Export the router to be used in the main application
module.exports = router;