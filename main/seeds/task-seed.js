// Import the Task model from the models directory
const { Task } = require('../models');

// Define an array of task data
const TaskData = [
    {
        // Define the first task
        'name': 'Task 1',
        'description': 'this is a test, the first one. a priority, not started.',
        'priority': true,
        'progress': 1,
        'due_date': new Date ('2024-01-05'),
        'notification': true,
        'user_id': 1,
    },
    {
        // Define the second task
        'name': 'Task 2',
        'description': 'this is a test, the second one. not a priority, in progress.',
        'priority': false,
        'progress': 2,
        'due_date': new Date ('2024-01-10'),
        'notification': false,
        'user_id': 1,
    },
    {
        // Define the third task
        'name': 'Task 3',
        'description': 'this is a test, the third one. not a priority, done',
        'priority': false,
        'progress': 3,
        'due_date': new Date ('2024-01-03'),
        'notification': false,
        'user_id': 1,
    },
    {
        // Define the fourth task
        'name': 'Task 4',
        'description': 'this is a test, the fourth one. a priority, not started',
        'priority': true,
        'progress': 1,
        'due_date': new Date ('2024-01-20'),
        'notification': true,
        'user_id': 1,
    },
    {
        // Define the fifth task
        'name': 'Task 5',
        'description': 'this is a test, the fifth one. a priority, not started',
        'priority': true,
        'progress': 1,
        'due_date': new Date ('2024-01-01'),
        'notification': true,
        'user_id': 1,
    },
];

// Define a function to seed the tasks into the database
const seedTasks = () => Task.bulkCreate(TaskData);

// Export the seedTasks function
module.exports = seedTasks;
