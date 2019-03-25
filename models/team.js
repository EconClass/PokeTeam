const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  mongoosePaginate = require('mongoose-paginate');

mongoosePaginate.paginate.options = { limit: 6 };

const TeamSchema = new Schema({
  name: { type: String, required: true },
  trainer: String,
  description: String,
  pokemon: [Object],
},
{ timestamps: true });

TeamSchema.plugin(mongoosePaginate);

module.exports = mongoose.model ('Team', TeamSchema );
