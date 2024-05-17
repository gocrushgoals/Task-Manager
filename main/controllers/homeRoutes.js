const router = require('express').Router();
const { User, Task } = require('../models');
const withAuth = require('../utils/auth');

// Hompage route
router.get('/', withAuth, async (req, res) => {
    try {
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

// Route to edit task
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const taskData = await Task.findByPk(req.params.id);

        const task = taskData.get({ plain: true });
        console.log(task);

        res.render('edit', {
            ...task,
            logged_in: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Route to highPriority tasks
router.get('/highPriority', withAuth, async (req, res) => {
    try {
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

        res.render('highPriority', {
            ...user,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Route to lowPriority tasks
router.get('/lowPriority', withAuth, async (req, res) => {
    try {
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

        res.render('lowPriority', {
            ...user,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Route to dueSoon tasks
router.get('/dueSoon', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Task }],
            order: [[Task, 'due_date', 'ASC']],
        });

        const user = userData.get({ plain: true });
        console.log('------DUE SOON HERE--------');
        console.log(user);

        res.render('dueSoon', {
            ...user,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// When logged in redirect to homepage
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
