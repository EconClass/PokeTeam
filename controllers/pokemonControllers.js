const Pokedex = require('pokedex-promise-v2'),
  P = new Pokedex(),
  Nature = require('../models/nature.js'),
  helpers = require('../utils/helpers.js');

/** =============POKEMON INFO CONTROLS=============
 * We'll take only the info what we need, from the PokéAPI
 * and turn it into something more managable.
 */
async function getPokemon(req, res) {
  const pokeRes = await P.getPokemonByName(req.params.pokeName);

  // Reformat pokémon stats into key-value pairs.
  const pokeStats = {};
  pokeRes.stats.map(s => {
    const statName = s.stat.name;
    pokeStats[statName] = s.base_stat;
  })

  // Reformat pokémon abilities into an array. 
  const pokeAbilities = [];

  pokeRes.abilities.map(ablty => {
    const toAdd = {};
    ablty.is_hidden ? toAdd.hidden = true : toAdd.hidden = false;
    toAdd.ability = ablty.ability.name;
    pokeAbilities.push(toAdd);
  });

  //  Reformat type(s) of Pokemon into an array.
  const pokeTypes = [];
  pokeRes.types.map(t => {
    pokeTypes.push(t.type.name);
  })

  // Create a new pokemon model with relevant information
  const pokemon = {
    name: pokeRes.name,
    image: pokeRes.sprites.front_default,
    stats: pokeStats,
    abilities: pokeAbilities,
    type: pokeTypes
  };

  res.send(pokemon);
};

// =============GET MOVES ARRAY CONTROLS============= \\
async function getMoves(req, res) {
  const pokeRes = await P.getPokemonByName(req.params.pokeName);
  const pokeMoves = helpers.arrayIter(pokeRes.moves, 'move');

  res.send(pokeMoves);
};

// =============ALL HELD ITEMS ARRAY CONTROLS============= \\
async function getItems(req, res) {
  const itemResp = await P.getItemCategoryByName("held-items");
  const activeResp = await P.getItemAttributeByName("holdable-active");

  const items = helpers.arrayIter(itemResp.items, 'name');
  const activeItems = helpers.arrayIter(activeResp.items, 'name');

  const results = helpers.unionArrays(items, activeItems);

  res.send(results);
};

// =============ALL NATURES ARRAY CONTROLS============= \\
async function getNatures(req, res) {
  const natures = await Nature.find()
  res.send(natures)
};

// =============MOVE INFO CONTROLS============= \\
async function getMoveInfo(req, res) {
  const body = await P.getMoveByName(req.params.moveName);
  const moveInfo = {};

  // Flatten data
  moveInfo.accuracy = body.accuracy;
  moveInfo.power = body.power;
  moveInfo.pp = body.pp;
  moveInfo.priority = body.priority;
  moveInfo.name = body.name;

  moveInfo.class = body.damage_class.name;
  moveInfo.type = body.type.name;
  moveInfo.target = body.target.name;
  moveInfo.effect = body.effect_entries[0].short_effect;

  res.send(moveInfo);
};

module.exports = {
  getPokemon,
  getMoves,
  getMoveInfo,
  getItems,
  getNatures,
};