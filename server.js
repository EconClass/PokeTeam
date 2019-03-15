if (!process.env.PORT) {
  require('dotenv').config();
};

const express = require('express'),
      bodyparser = require('body-parser'),
      methodoverride = require('method-override'),
      app = express(),
      port = process.env.PORT || 3000;

//========================MIDDLEWARE========================\\

// Dependencies
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(methodoverride('_method'));

// Mongoose Connection
require('./data/poketeam-db');

// Routers
const authRoutes = require('./routers/auth');
const teamRoutes = require('./routers/teams');
const pokeRoutes = require('./routers/pokemons.js')
app.use(authRoutes);
app.use(teamRoutes);
app.use(pokeRoutes);
// Access Port
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});