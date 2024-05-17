// Import the Sequelize library. Sequelize is a promise-based Node.js ORM (Object-Relational Mapping) for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
const Sequelize = require('sequelize');

// Import the dotenv module. This module loads environment variables from a .env file into process.env, providing a way to set environment variables that the application needs without exposing them in the code.
require('dotenv').config();

// Declare a variable 'sequelize'. This will be used to hold the instance of Sequelize that connects to the database.
let sequelize;

// Check if the JAWSDB_URL environment variable is set. This environment variable contains the URL for a JawsDB database, which is a fully functional MySQL Database as a Service platform. If the application is running on a platform that provides a JawsDB service (like Heroku), this environment variable will be set.
if (process.env.JAWSDB_URL) {
    // If the JAWSDB_URL environment variable is set, initialize 'sequelize' with this URL. This creates a connection to the JawsDB database.
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // If the JAWSDB_URL environment variable is not set, the application is not running on a platform that provides a JawsDB service. In this case, initialize 'sequelize' to connect to a local MySQL database. The database name, username, and password are retrieved from environment variables. This is a common practice for protecting sensitive information.
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            // The host of the database is set to 'localhost'.
            host: 'localhost',
            // The dialect is set to 'mysql', indicating that MySQL is being used.
            dialect: 'mysql',
            // The port on which the database server is running is set to 3306.
            port: 3306,
            // Disable logging to the console.
            logging: false,
        }
    );
}

// Export the 'sequelize' instance. This makes it available to other parts of the application that require database access.
module.exports = sequelize;
