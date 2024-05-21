// Import necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import the Sequelize connection
const sequelize = require('../config/connection');

// Define the Task model by extending the Sequelize Model class
class Task extends Model {}

// Initialize the Task model with attributes and options
Task.init(
    {
        // Define the 'id' attribute as primary key with auto-increment
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // Define the 'name' attribute as a string with allowNull false
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Define the 'description' attribute as a string
        description: {
            type: DataTypes.STRING,
        },
        // Define the 'priority' attribute as a boolean with allowNull false
        priority: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        // Define the 'due_date' attribute as a date with allowNull false
        due_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        // Define the 'notification' attribute as a boolean with allowNull false
        notification: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        // Define the 'user_id' attribute as a foreign key referencing the User model
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize, // Assign the Sequelize connection
        timestamps: false, // Disable timestamps
        freezeTableName: true, // Use the model name as the table name
        underscored: true, // Use underscored naming for attributes
        modelName: 'task' // Set the model name in singular form
    }
);

// Export the Task model for use in other parts of the application
module.exports = Task;