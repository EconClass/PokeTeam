const router = require('express').Router(),
      pokemonControls = require('../controllers/pokemonControllers.js'),
      errHandler = require('../utils/errorHandler.js');

router.post('./team/:teamId')