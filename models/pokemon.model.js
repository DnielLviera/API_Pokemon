const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  types: {
    type: [String],
    required: true
  },
  height: Number,
  weight: Number,
  sprite: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Pokemon', pokemonSchema);