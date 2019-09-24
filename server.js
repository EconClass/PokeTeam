require('dotenv').config();

const express = require('express'),
  bodyparser = require('body-parser'),
  methodoverride = require('method-override'),
  app = express(),
  path = require('path'),
  cookieparser = require('cookie-parser'),
  cors = require("cors"),
  port = process.env.PORT || 5000;

//========================MIDDLEWARE========================\\

// Dependencies
app.use(express.json())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(methodoverride('_method'));
app.use(cookieparser());
app.use(cors());
app.options('*', cors());

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
app.use(authRoutes);
app.use(teamRoutes);
app.use(pokeRoutes);

// Access Port
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
