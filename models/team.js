const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  pokemon: [Object],
},
{ timestamps: true });

module.exports = mongoose.model ('Team', TeamSchema );