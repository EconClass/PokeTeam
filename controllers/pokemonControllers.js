const Pokedex = require('pokedex-promise-v2'),
  P = new Pokedex(),
  Nature = require('../models/nature.js');

/** =============POKEMON INFO CONTROLS=============
 * We'll take only the info what we need, from the PokéAPI
 * and turn it into something more manageable.
 */
async function getPokemon(req, res) {
  console.log(req.params.pokeName)
  const pokeRes = await P.getPokemonByName(req.params.pokeName);

  // Reformat pokémon stats into key-value pairs
  const pokeStats = {};
  pokeRes.stats.forEach(s => {
    const statName = s.stat.name;
    pokeStats[statName] = s.base_stat;
  })

  const pokeAbilities = [];
  // Reformat pokémon abilities into an array
  pokeRes.abilities.forEach(({ ability, is_hidden }) => {
    pokeAbilities.push({
      ability: ability.name,
      url: ability.url,
      hidden: is_hidden
    });
  });

  //  Reformat type(s) of Pokemon into an array.
  const pokeTypes = pokeRes.types.map(type => type.type.name);

  // Create a new pokemon object with relevant information
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
  const pokeMoves = pokeRes.moves.map((move) => move.name)

  res.send(pokeMoves);
};

// =============ALL HELD ITEMS ARRAY CONTROLS============= \\
async function getItems(req, res) {
  const itemResp = await P.getItemCategoryByName("held-items");
  const activeResp = await P.getItemAttributeByName("holdable-active");

  const items = itemResp.items.map((item) => item.name);
  const activeItems = activeResp.items.map((item) => item.name);

  // find the union of the the two arrays
  const results = [...new Set([...items, ...activeItems])];

  res.send(results);
};

// =============ALL NATURES ARRAY CONTROLS============= \\
async function getNatures(req, res) {
  const natures = await Nature.find()
  res.send(natures)
};

// =============MOVE INFO CONTROLS============= \\
async function getMoveInfo(req, res) {
  const {
    accuracy,
    power,
    pp,
    priority,
    name,
    damage_class,
    type,
    target,
    effect_entries
  } = await P.getMoveByName(req.params.moveName);

  // Flatten data
  const moveInfo = {
    accuracy,
    power,
    pp,
    priority,
    name,
  };

  moveInfo.class = damage_class.name;
  moveInfo.type = type.name;
  moveInfo.target = target.name;
  moveInfo.effect = effect_entries[0].effect;

  res.send(moveInfo);
};

module.exports = {
  getPokemon,
  getMoves,
  getMoveInfo,
  getItems,
  getNatures,
};