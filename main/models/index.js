// Import the Task, User, and Notification models from their respective files
const Task = require('./Task');
const User = require('./User');
const Notification = require('./Notification');

// Define a one-to-many relationship between User and Task
// This means that one User can have many Tasks
// The 'user_id' field in the Task model is used as the foreign key
User.hasMany(Task, {
    foreignKey: 'user_id',
});

// Define a one-to-one relationship between Task and User
// This means that each Task is associated with one User
// The 'user_id' field in the Task model is used as the foreign key
Task.belongsTo(User, {
    foreignKey: 'user_id',
});

// Export the Task, User, and Notification models so they can be used in other parts of the application
module.exports = { Task, User, Notification };
