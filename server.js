require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');


const routes = require('./routes');
const sequelize = require('./config');

const hbs = exphbs.create({});

const app = express();

const PORT = process.env.PORT || 3001;

const sessionsettings = {
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
}

// Tells node we're using handlebars as our templating engine
// configured handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sessionSettings));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
