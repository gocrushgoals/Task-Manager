// Import the Model class and DataTypes object from sequelize
const { Model, DataTypes } = require('sequelize');

// Import the configured sequelize instance from the connection module
const sequelize = require('../config/connection');

// Define a new Model subclass called Notification
class Notification extends Model {}

// Initialize the Notification model with its attributes and options
Notification.init(
    {
        // Define a due_date attribute of type DATE which cannot be null
        due_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        // Define a details attribute of type STRING which cannot be null
        details: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        // Pass the sequelize instance to the model
        sequelize,
        // Disable automatic timestamp fields (createdAt and updatedAt)
        timestamps: false,
        // Prevent sequelize from pluralizing the model name
        freezeTableName: true,
        // Enable automatic underscored field naming (e.g. firstName becomes first_name)
        underscored: true,
        // Set the model name to 'notification'
        modelName: 'notification'
    }
);

// Export the Notification model for use in other modules
module.exports = Notification;
