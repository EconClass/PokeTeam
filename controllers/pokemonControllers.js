const Pokemon = require('../models/pokemon.js'),
      Pokedex = require('pokedex-promise-v2'),
      P = new Pokedex();

async function getPokemon(req, res) {
  // This will return with way more information than we need
  let pokeRes = await P.getPokemonByName(req.params.pokeName);

  // Reformat stats of pokemon
  let pokeStats = {
    speed: pokeRes.stats[0].base_stat,
    spDef: pokeRes.stats[1].base_stat,
    spAtk: pokeRes.stats[2].base_stat,
    def: pokeRes.stats[3].base_stat,
    atk: pokeRes.stats[4].base_stat,
    hp: pokeRes.stats[5].base_stat,
  }
  
  // Reformat possible abilities of Pokemon
  let abltyArray = [];
  for(i = 0; i < pokeRes.abilities.length; i++) {
    let toAdd = {}
    if(pokeRes.abilities[i].is_hidden == true) {
      toAdd.hidden = true
    } else {
      toAdd.hidden = false
    }
    toAdd.ability = pokeRes.abilities[i].ability.name
    abltyArray.push(toAdd) 
  }

  // Reformat type(s) of Pokemon
  let typeArray = [];
  for(i = 0; i < pokeRes.types.length; i++) {
    console.log(pokeRes.types[i].type.name)
    typeArray.push(pokeRes.types[i].type.name) 
  }
  console.log(typeArray)
  // Create a new pokemon model with relevant information
  let pokemon = new Pokemon({ 
    name: pokeRes.name,
    image: pokeRes.sprites.front_default,
    stats: pokeStats,
    abilities: abltyArray,
    type: typeArray
  });
  
  res.send(pokemon)
}

async function getMoves(req, res) {
  let pokeRes = await P.getPokemonByName(req.params.pokeName);
  let pokeMoves = pokeRes.moves;
  let movesArray = [];

  for(i = 0; i < pokeMoves.length; i++) {
    movesArray.push(pokeMoves[i].move);
  };

  res.send(movesArray)
};

async function moveInfo(req, res) {
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
  moveInfo,
}