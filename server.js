// Import Required libraries
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const { sendEmail } = require('./utils/nodemailer');
const { Op } = require('sequelize');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { Notification } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
    // Signs the session
    secret: 'Super secret secret',
    // This IS essentially the session
    cookie: {
    // when the cookie will expire (in ms)
        maxAge: 3000000,
        // prevents access through JS in the client
        httpOnly: true,
        // Server and Client will reject if not served from HTTPS
        secure: false,
        // Only sites on the same domain can use this cookie
        sameSite: 'strict',
    },
    // forces the session to be saved even if nothing changed
    resave: false,
    // forces a session to be saved when it is new regardless of if anything has changed
    saveUninitialized: true,
    // where to store the session on the server
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

function pollEmails(intervalInSeconds) {
    setInterval(async () => {
        const currentTime = new Date().getTime();
        const dayBefore = 24 * 60 * 60 * 1000;
        const dueTime = new Date(currentTime + dayBefore);

        try {
            const scheduledEmailsData = await Notification.findAll({
                where: {
                    due_date: {
                        [Op.between]: [currentTime, dueTime]
                    }
                }
            });

            const scheduledEmails = scheduledEmailsData.map(item => item.get({ plain: true }));

            for (const email of scheduledEmails) {
                const emailDetails = JSON.parse(email.details);

                if (emailDetails.to) {
                    console.log(emailDetails);
                    const sender = await sendEmail(emailDetails.to, emailDetails.subject, emailDetails.text);

                    console.log(sender);

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

sequelize.sync({ force: false }).then(() => {
    pollEmails(15);
    app.listen(PORT, () => console.log('Now listening'));
});