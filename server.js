const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const hbs = exphbs.create({ helpers });

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 7200000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));

// turn on routes
app.use(routes);

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log("Now listening on http://localhost:3001/")
  );
});
