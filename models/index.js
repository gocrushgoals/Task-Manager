// import models
const Task = require('./task');
const Category = require('./category');
const User = require('./user');


// Define associations
Task.belongsTo(Category);
Category.hasMany(Task);

User.hasMany(Task);
Task.belongsTo(User);

// Sync the models with the database
sequelize.sync({ force: true }).then(() => {
  console.log('Models synced with database');
}).catch(err => {
  console.error('Error syncing models:', err);
});

module.exports = {
  Task,
  Category,
  User,  
};
