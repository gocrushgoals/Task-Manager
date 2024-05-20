// Importing the necessary modules from sequelize and bcrypt
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Importing the sequelize configuration
const sequelize = require('../config/connection');

// Defining the User class which extends the Model class from sequelize
class User extends Model {
    // Method to check if the provided password matches the hashed password in the database
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// Initializing the User model with its fields and configurations
User.init(
    {
        // User ID field
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // User name field
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // User email field
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        // User password field
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
        // Hooks to hash the password before creating and updating a user
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
        // Passing the sequelize configuration
        sequelize,
        // Disabling timestamps
        timestamps: false,
        // Freezing the table name to prevent sequelize from pluralizing it
        freezeTableName: true,
        // Enabling underscored for auto generated fields
        underscored: true,
        // Defining the model name
        modelName: 'user',
    }
);

// Exporting the User model
module.exports = User;
