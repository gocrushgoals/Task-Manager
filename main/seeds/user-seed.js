// Import the User model from the '../models' directory
const { User } = require('../models');

// Define an array of user data to be seeded into the database
const UserData = [
    {
        'name': 'Flora', // User's name
        'email': 'test@test.com', // User's email
        'password': '$2b$10$daObReD5OEQ1Ddf99Ire3eQykvmdcUiEG274NPZN4KmgGjTQ0dKzq' // User's hashed password
    },
    {
        'name': 'Layla', // User's name
        'email': 'test@test2.com', // User's email
        'password': '$2b$10$daObReD5OEQ1Ddf99Ire3eQykvmdcUiEG274NPZN4KmgGjTQ0dKzq' // User's hashed password
    },
];

// Define a function to seed the user data into the database using the bulkCreate method of the User model
const seedUsers = () => User.bulkCreate(UserData);

// Export the seedUsers function
module.exports = seedUsers;
