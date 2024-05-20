// Import the task seed data
const seedTasks = require('./task-seed');

// Import the user seed data
const seedUsers = require('./user-seed');

// Import the sequelize configuration
const sequelize = require('../config/connection');

// Define an asynchronous function to seed the database
const seedDatabase = async () => {
    // Sync the database, force: true will drop the table if it already exists
    await sequelize.sync({ force: true });
    // Log a message to the console once the database has been synced
    console.log('\n----- DATABASE SYNCED -----\n');

    // Seed the users data
    await seedUsers();
    // Log a message to the console once the users data has been seeded
    console.log('\n----- USERS SEEDED -----\n');

    // Seed the tasks data
    await seedTasks();
    // Log a message to the console once the tasks data has been seeded
    console.log('\n----- TASKS SEEDED -----\n');

    // Exit the process
    process.exit(0);
};

// Call the seedDatabase function
seedDatabase();
