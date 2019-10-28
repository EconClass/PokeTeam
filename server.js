require('dotenv').config();

const express = require('express'),
  bodyparser = require('body-parser'),
  methodoverride = require('method-override'),
  app = express(),
  cookieparser = require('cookie-parser'),
  port = process.env.PORT || 5000;

//========================MIDDLEWARE========================\\

// Dependencies
app.use(express.json())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(methodoverride('_method'));
app.use(cookieparser());
// app.use(cors());
// app.options('*', cors());

// Mongoose Connection
require('./data/poketeam-db.js');

// HOME
app.get('/', (req, res) => {
  res.send('Documentation at: https://econclass.github.io/PokeTeam/')
});

// Routers
const authRoutes = require('./routers/auth.js');
const teamRoutes = require('./routers/teams.js');
const pokeRoutes = require('./routers/pokemons.js');
const got = require('got');

app.use(authRoutes);
app.use(teamRoutes);
app.use(pokeRoutes);

// Access Port
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

const { GA_TRACKING_ID } = process.env;

const trackEvent = (category, action, label, value) => {
  const data = {
    // API Version.
    v: '1',
    // Tracking ID / Property ID.
    tid: GA_TRACKING_ID,
    // Anonymous Client Identifier. Ideally, this should be a UUID that
    // is associated with particular user, device, or browser instance.
    cid: '555',
    // Event hit type.
    t: 'event',
    // Event category.
    ec: category,
    // Event action.
    ea: action,
    // Event label.
    el: label,
    // Event value.
    ev: value,
  };

  return got.post('http://www.google-analytics.com/collect', data);
};