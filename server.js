const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const { Dish } = require('./models');
//const helpers = require('./utils/helpers');
const dishRoutes = require('./controllers/api/dishRoutes');


//const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//Set up Handlebars.js engine
//const hbs = exphbs.create({ helpers });

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({  partialsDir: path.join(__dirname,
   'views/partials'), });



const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// Set the views directory path
//app.set('views', path.join(__dirname, 'views'));

app.use(routes);
// app.use('/api', dishRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
