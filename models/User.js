// Import necessary modules from Sequelize and bcrypt
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Import the Sequelize connection
const sequelize = require('../config/connection');

// Define the User model by extending the Sequelize Model class
class User extends Model {
    // Method to check password validity
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// Initialize the User model with attributes and options
User.init(
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
        // Define the 'email' attribute as a string with unique constraint and email validation
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        // Define the 'password' attribute as a string with length validation
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
        // Define hooks to hash the password before creating or updating a user
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize, // Assign the Sequelize connection
        timestamps: false, // Disable timestamps
        freezeTableName: true, // Use the model name as the table name
        underscored: true, // Use underscored naming for attributes
        modelName: 'user', // Set the model name in singular form
    }
);

// Export the User model for use in other parts of the application
module.exports = User;