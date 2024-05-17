// Importing required modules and functions
const router = require('express').Router(); // Express router to define routes
const { Task, Notification } = require('../../models'); // Importing Task and Notification models from models directory
const withAuth = require('../../utils/auth'); // Importing authentication middleware

// Function to schedule an email notification
const scheduleEmail = async (dueDate, emailDetails) => {
    try {
        // Creating a new Notification with the provided due date and email details
        const notification = await Notification.create({
            due_date: dueDate,
            details: JSON.stringify(emailDetails)
        });
        console.log(notification); // Logging the created notification
    } catch (err) {
        console.log(err); // Logging any errors
    }
};

// POST route to add a new task
router.post('/', withAuth, async (req, res) => {
    try{
        // Destructuring the request body to get task details
        const { name, description, notification, priority, due_date } = req.body;
        
        // Creating a new Task with the provided details
        const newTask = await Task.create({
            name: name,
            description: description,
            notification: notification,
            priority: priority === 'high' ? true : false, // Setting priority to true if it's 'high', false otherwise
            due_date: due_date,
            user_id: req.session.user_id // Getting user id from the session
        });
        
        // Defining email details for the notification
        const emailDetails = {
            to: req.session.email, // Recipient email
            subject: 'Task Due Reminder', // Email subject
            text: `This is a reminder that your task ${req.body.name}: ${req.body.description} is due tomorrow.`, // Email body
        };

        // Scheduling the email notification
        await scheduleEmail(newTask.due_date, emailDetails);

        // Sending the created task as a response
        res.json(newTask);
    } catch (err) {
        console.log(err); // Logging any errors
        res.status(400).json(err); // Sending a 400 status code and the error as a response
    }
});

// PUT route to update a task by its ID
router.put('/:id', withAuth, async (req, res) => {
    console.log(req.body); // Logging the request body
    try {
        // Updating the Task with the provided ID with the details from the request body
        const updateTask = await Task.update(req.body, {
            where: {
                id: req.params.id // Specifying the ID of the task to update
            }
        });
        res.json(updateTask); // Sending the updated task as a response
    } catch (err) {
        console.log(err); // Logging any errors
        res.status(400).json(err); // Sending a 400 status code and the error as a response
    }
});

// DELETE route to delete a task by its ID
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // Deleting the Task with the provided ID
        const deleteTask = await Task.destroy({
            where: {
                id: req.params.id // Specifying the ID of the task to delete
            }
        });
        res.json(deleteTask); // Sending the deleted task as a response
    } catch (err) {
        res.status(500).json(err); // Sending a 500 status code and the error as a response
    }
});

// Exporting the router to be used in other parts of the application
module.exports = router;
