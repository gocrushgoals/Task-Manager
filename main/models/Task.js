// Importing Model and DataTypes from 'sequelize' package
const { Model, DataTypes } = require('sequelize');

// Importing the configured sequelize connection from '../config/connection'
const sequelize = require('../config/connection');

// Defining a new Model class 'Task'
class Task extends Model {}

// Initializing 'Task' model with its fields and configurations
Task.init(
    {
        // 'id' field which is an integer, cannot be null, is the primary key and auto increments
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // 'name' field which is a string and cannot be null
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // 'description' field which is a string
        description: {
            type: DataTypes.STRING,
        },
        // 'priority' field which is a boolean and cannot be null
        priority: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        // 'due_date' field which is a date and cannot be null
        due_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        // 'notification' field which is a boolean and cannot be null
        notification: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        // 'user_id' field which is an integer and references 'id' field in 'user' model
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        // Configuring the model to use the imported sequelize connection
        sequelize,
        // Disabling timestamps for this model
        timestamps: false,
        // Freezing the table name to be the same as the model name
        freezeTableName: true,
        // Enabling underscored for auto created fields
        underscored: true,
        // Defining the model name as 'task'
        modelName: 'task'
    }
);

// Exporting the 'Task' model
module.exports = Task;
