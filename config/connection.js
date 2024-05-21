// Import necessary packages
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Check if JAWSDB_URL environment variable is set for Heroku deployment
if (process.env.JAWSDB_URL) {
    // Connect to JawsDB database
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // Connect to local MySQL database using environment variables
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306,
        }
    );
}

module.exports = sequelize;