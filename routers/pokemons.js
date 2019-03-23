const router = require('express').Router(),
  pokemonControls = require('../controllers/pokemonControllers.js'),
  errHandler = require('../utils/errorHandler.js');

// GET POKEMON BY NAME
router.get('/pokemon/:pokeName', errHandler(pokemonControls.getPokemon));

// GET ALL LEARNABLE MOVES OF A POKEMON
router.get('/pokemon/:pokeName/moves', errHandler(pokemonControls.getMoves));

// GET A LIST OF ALL HELD ITEMS
router.get('/held-items', errHandler(pokemonControls.getItems));

// GET LIST OF ALL NATURES
router.get('/natures', errHandler(pokemonControls.getNatures));

// GET MOVE INFO BY NAME
router.get('/move/:moveName', errHandler(pokemonControls.getMoveInfo));

module.exports = router;