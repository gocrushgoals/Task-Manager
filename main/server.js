// Importing required modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const { sendEmail } = require('./utils/nodemailer');
const { Op } = require('sequelize');

// Importing sequelize configuration and models
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { Notification } = require('./models');

// Creating an express app
const app = express();
// Setting the port for the app to listen on
const PORT = process.env.PORT || 3001;

// Setting up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Configuring the session
const sess = {
    secret: 'Super secret secret', // Secret key for signing the session
    cookie: {
        maxAge: 3000000, // Cookie expiration time in milliseconds
        httpOnly: true, // Prevents access through JavaScript in the client
        secure: false, // Server and client will reject if not served from HTTPS
        sameSite: 'strict', // Only sites on the same domain can use this cookie
    },
    resave: false, // Forces the session to be saved even if nothing changed
    saveUninitialized: true, // Forces a session to be saved when it is new regardless of if anything has changed
    store: new SequelizeStore({ // Where to store the session on the server
        db: sequelize
    })
};

// Using the session middleware
app.use(session(sess));

// Setting the view engine to handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Using middleware for parsing JSON and urlencoded form data and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Using the routes defined in './controllers'
app.use(routes);

// Function to poll emails at a specified interval
function pollEmails(intervalInSeconds) {
    setInterval(async () => {
        const currentTime = new Date().getTime();
        const dayBefore = 24 * 60 * 60 * 1000;
        const dueTime = new Date(currentTime + dayBefore);

        try {
            // Fetching scheduled emails from the database
            const scheduledEmailsData = await Notification.findAll({
                where: {
                    due_date: {
                        [Op.between]: [currentTime, dueTime]
                    }
                }
            });

            const scheduledEmails = scheduledEmailsData.map(item => item.get({ plain: true }));

            // Looping through each scheduled email
            for (const email of scheduledEmails) {
                const emailDetails = JSON.parse(email.details);

                if (emailDetails.to) {
                    console.log(emailDetails);
                    // Sending the email
                    const sender = await sendEmail(emailDetails.to, emailDetails.subject, emailDetails.text);

                    console.log(sender);

                    // If the email was sent successfully, delete it from the database
                    if (sender.response.includes('OK')) {
                        await Notification.destroy({
                            where: {
                                id: email.id
                            }
                        });

                        console.log('Deleted one email');
                    }
                }
            }
        } catch (error) {
            console.error('Error processing scheduled emails:', error);
        }
    }, intervalInSeconds * 1000); // Convert intervalInSeconds to milliseconds
}

// Syncing the database and starting the server
sequelize.sync({ force: false }).then(() => {
    pollEmails(30);
    app.listen(PORT, () => console.log('Now listening'));
});
