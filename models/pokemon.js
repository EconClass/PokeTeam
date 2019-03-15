const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const PokemonSchema = new Schema({
  name: { type: String, required: true },
  ability: String,
  nature: String,
  heldItem: String,
  stats: Object,
  moves: Object,
},
{ timestamps: true });

module.exports = mongoose.model ('Pokemon', PokemonSchema );