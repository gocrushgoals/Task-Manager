// Import necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import the Sequelize connection
const sequelize = require('../config/connection');

// Define the Notification model by extending the Sequelize Model class
class Notification extends Model {}

// Initialize the Notification model with attributes and options
Notification.init(
    {
        // Define the 'due_date' attribute with type DATE and allowNull false
        due_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        // Define the 'details' attribute with type STRING and allowNull false
        details: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize, // Assign the Sequelize connection
        timestamps: false, // Disable timestamps
        freezeTableName: true, // Use the model name as the table name
        underscored: true, // Use underscored naming for attributes
        modelName: 'notification' // Set the model name in singular form
    }
);

// Export the Notification model for use in other parts of the application
module.exports = Notification;