const natures = require('../natures.json'),
      Pokedex = require('pokedex-promise-v2'),
      P = new Pokedex(),
      helpers = require('../utils/helpers.js');

/** =============POKEMON INFO CONTROLS=============
 * We'll take only the info what we need, from the PokéAPI
 * and turn it into something more managable.
 */
async function getPokemon(req, res) {
  
  let pokeRes = await P.getPokemonByName(req.params.pokeName);

  // Reformat pokémon stats into key-value pairs.
  let pokeStats = {};
  for(i = 0; i < pokeRes.stats.length; i++) {
    let statName = pokeRes.stats[i].stat.name;
    pokeStats[statName] = pokeRes.stats[i].base_stat;
  };
  
  // Reformat pokémon abilities into an array. 
  let pokeAbilities = [];
  for(i = 0; i < pokeRes.abilities.length; i++) {
    let toAdd = {};
    if(pokeRes.abilities[i].is_hidden == true) {
      toAdd.hidden = true;
    } else {
      toAdd.hidden = false;
    };

    toAdd.ability = pokeRes.abilities[i].ability.name;
    pokeAbilities.push(toAdd);
  };

  /**
   *  Reformat type(s) of Pokemon
   *  TODO: Why can't the following work?
   *    helpers.arrayIter(pokeRes.types, "type.name")
   */
  let pokeTypes = [];
  for(i = 0; i < pokeRes.types.length; i++) {
    pokeTypes.push(pokeRes.types[i].type.name);
  };

  // Create a new pokemon model with relevant information
  let pokemon = { 
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
  let pokeRes = await P.getPokemonByName(req.params.pokeName);
  let pokeMoves = helpers.arrayIter(pokeRes.moves, 'move');

  res.send(pokeMoves);
};

// =============ALL HELD ITEMS ARRAY CONTROLS============= \\
async function getItems(req, res) {
  let itemResp = await P.getItemCategoryByName("held-items");
  let activeResp = await P.getItemAttributeByName("holdable-active");

  let items = helpers.arrayIter(itemResp.items, 'name');
  let activeItems = helpers.arrayIter(activeResp.items, 'name');

  let results = helpers.unionArrays(items, activeItems);

  res.send(results);
};

// =============ALL NATURES ARRAY CONTROLS============= \\
async function getNatures(req, res) {
  res.send(natures);
};

// =============MOVE INFO CONTROLS============= \\
async function getMoveInfo(req, res) {
  let body = await P.getMoveByName(req.params.moveName);
  let moveInfo = {};

  // Restructure info into a flat object
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