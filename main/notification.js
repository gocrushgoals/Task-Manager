const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport(
    smtpTransport({
        service: 'gmail', // e.g., 'gmail'
        host: 'smtp.gmail.com',
        auth: {
            user: 'edibengston@gmail.com',
            pass: process.env.EMAIL_PASSWORD,
        },
    })
);

// Function to send the email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'task.management.project.bootcamp@gmail.com',
        to,
        subject,
        text,
    };
    console.log(mailOptions),
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error(error);
        }
        console.log('Email sent:', info.response);
    });
};

// Function to schedule email based on due date
const scheduleEmail = (dueDate, emailDetails) => {
    const currentTime = new Date().getTime();
    const dueTime = new Date(dueDate).getTime(); // Calculate due time based on the provided due date
    const timeDifference = dueTime - currentTime; // Calculate time difference in milliseconds

    console.log(timeDifference);

    if (timeDifference > 0) {
    // Schedule the email to be sent when the due date is reached
        setTimeout(() => {
            sendEmail(emailDetails.to, emailDetails.subject, emailDetails.text);
        }, timeDifference);
    } else {
        console.log('Due date has already passed.');
    }
};
// Example usage
const taskDueDate = '2024-01-07T17:30:00Z'; // Replace with your task due date
const emailDetails = {
    to: 'ivana.djordjevic@live.ca',
    subject: 'Task Due Reminder',
    text: 'This is a reminder that your task is due soon.',
};

scheduleEmail(taskDueDate, emailDetails);
