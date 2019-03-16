const natures = require('../natures.json'),
      Pokedex = require('pokedex-promise-v2'),
      P = new Pokedex(),
      helpers = require('../utils/helpers.js');

// =============POKEMON INFO CONTROLS============= \\
async function getPokemon(req, res) {
  // This will return with way more information than we need
  let pokeRes = await P.getPokemonByName(req.params.pokeName);

  // Reformat stats of pokemon
  let pokeStats = {};
  for(i = 0; i < pokeRes.stats.length; i++) {
    let statName = pokeRes.stats[i].stat.name;
    pokeStats[statName] = pokeRes.stats[i].base_stat;
  };
  
  // Reformat possible abilities of Pokemon
  let abltyArray = [];
  for(i = 0; i < pokeRes.abilities.length; i++) {
    let toAdd = {};

    if(pokeRes.abilities[i].is_hidden == true) {
      toAdd.hidden = true;
    } else {
      toAdd.hidden = false;
    };

    toAdd.ability = pokeRes.abilities[i].ability.name;
    abltyArray.push(toAdd);
  };

  // Reformat type(s) of Pokemon
  // helpers.arrayObjProperty(pokeRes.types, 'type[name]')
  let typeArray = [];
  for(i = 0; i < pokeRes.types.length; i++) {
    typeArray.push(pokeRes.types[i].type.name);
  };

  // Create a new pokemon model with relevant information
  let pokemon = { 
    name: pokeRes.name,
    image: pokeRes.sprites.front_default,
    stats: pokeStats,
    abilities: abltyArray,
    type: typeArray
  };
  
  res.send(pokemon);
};

// =============GET MOVES ARRAY CONTROLS============= \\
async function getMoves(req, res) {
  let pokeRes = await P.getPokemonByName(req.params.pokeName);
  let movesArray = helpers.arrayObjProperty(pokeRes.moves, 'move');

  res.send(movesArray);
};

// =============ALL HELD ITEMS ARRAY CONTROLS============= \\
async function getItems(req, res) {
  let itemResp = await P.getItemCategoryByName("held-items");
  let activeResp = await P.getItemAttributeByName("holdable-active");

  let items = helpers.arrayObjProperty(itemResp.items, 'name');
  let activeItems = helpers.arrayObjProperty(activeResp.items, 'name');

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
  let resObj = {};

  // Restructure info 
  resObj.accuracy = body.accuracy;
  resObj.power = body.power;
  resObj.pp = body.pp;
  resObj.priority = body.priority;
  resObj.name = body.name;
  resObj.class = body.damage_class.name;
  resObj.type = body.type.name;
  resObj.target = body.target.name;
  resObj.effect = body.effect_entries[0].short_effect;

  res.send(resObj);
};

module.exports = {
  getPokemon,
  getMoves,
  getMoveInfo,
  getItems,
  getNatures,
};