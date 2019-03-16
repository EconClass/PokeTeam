const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const NatureSchema = new Schema({
  name: { type: String, required: true },
  increasedStat: { type: String, required: true },
  decreasedStat: { type: String, required: true },
});

module.exports = mongoose.model ('Nature', NatureSchema );