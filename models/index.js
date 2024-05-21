// Import the Task, User, and Notification models
const Task = require('./Task');
const User = require('./User');
const Notification = require('./Notification');

// Define associations between User and Task models
User.hasMany(Task, {
    foreignKey: 'user_id',
});

Task.belongsTo(User, {
    foreignKey: 'user_id',
});

// Export the Task, User, and Notification models with associations
module.exports = { Task, User, Notification };