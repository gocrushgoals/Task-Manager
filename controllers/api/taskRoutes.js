// Import the Express Router
const router = require('express').Router();

// Import the Task and Notification models
const { Task, Notification } = require('../../models');

// Import the withAuth middleware for authentication
const withAuth = require('../../utils/auth');

// Function to schedule an email notification
const scheduleEmail = async (dueDate, emailDetails) => {
    try {
        // Create a new notification in the database
        const notification = await Notification.create({
            due_date: dueDate,
            details: JSON.stringify(emailDetails)
        });
        console.log(notification);
    } catch (err) {
        console.log(err);
    }
};

// POST route to add a new task
router.post('/', withAuth, async (req, res) => {
    try {
        // Extract task details from the request body
        const { name, description, notification, priority, due_date } = req.body;

        // Create a new task in the database
        const newTask = await Task.create({
            name: name,
            description: description,
            notification: notification,
            priority: priority === 'high' ? true : false,
            due_date: due_date,
            user_id: req.session.user_id
        });

        // Prepare email details for the scheduled email
        const emailDetails = {
            to: req.session.email,
            subject: 'Task Due Reminder',
            text: `This is a reminder that your task ${req.body.name}: ${req.body.description} is due tomorrow.`,
        };

        // Schedule an email notification for the task due date
        await scheduleEmail(newTask.due_date, emailDetails);

        // Send the new task as JSON response
        res.json(newTask);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// PUT route to update a task by ID
router.put('/:id', withAuth, async (req, res) => {
    console.log(req.body);
    try {
        // Update the task with the provided ID
        const updateTask = await Task.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        // Send the updated task as JSON response
        res.json(updateTask);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// DELETE route to delete a task by ID
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // Delete the task with the provided ID
        const deleteTask = await Task.destroy({
            where: {
                id: req.params.id
            }
        });

        // Send the deletion result as JSON response
        res.json(deleteTask);
    } catch (err) {
        // Handle errors if deletion fails
        res.status(500).json(err);
    }
});

// Export the router to be used in the main application
module.exports = router;