// Import the required modules
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { Notification } = require('../models/Notification');

// Create a Nodemailer transporter
// This is used to send emails using SMTP (Simple Mail Transfer Protocol)
const transporter = nodemailer.createTransport(
    smtpTransport({
        pool: true, // Use a connection pool
        host: 'smtp.gmail.com', // The host of the SMTP server
        port: 465, // The port to connect to
        secure: true, // Use SSL
        auth: { // Authentication details
            user: 'edibengston@gmail.com', // The email address to authenticate as
            pass: process.env.EMAIL_PASSWORD, // The password to use for authentication
        },
    })
);

// Function to send the email
const sendEmail = async (to, subject, text) => {
    // Define the email options
    const mailOptions = {
        from: 'task.management.project.bootcamp@gmail.com', // The email address to send from
        to, // The email address to send to
        subject, // The subject of the email
        text, // The text content of the email
        //text: generateEmail(text),
        // create function to generate an HTML body
    };
    console.log('transporter send mail');
    // Send the email
    return await transporter.sendMail(mailOptions);
};

// Function to schedule email based on due date
const scheduleEmail = async (dueDate, emailDetails) => {
    // const currentTime = new Date().getTime();
    const dayBefore = 24 * 60 * 60 * 1000; // The number of milliseconds in a day
    const dueTime = new Date(new Date(dueDate).getTime() - dayBefore); // The time the email should be sent
    // const timeDifference = dueTime - currentTime;
    // console.log('due time: ' , new Date(dueTime))
    // console.log(timeDifference)
    try {
        // Create a new notification
        const notification = await Notification.create({
            due_date: dueTime, // The time the notification should be sent
            details: JSON.stringify(emailDetails), // The details of the email to send
        });
        console.log(notification);
    } catch (err) {
        console.log(err); // Log any errors
    }
};

// Export the transporter and the functions
module.exports = { transporter, sendEmail, scheduleEmail };
