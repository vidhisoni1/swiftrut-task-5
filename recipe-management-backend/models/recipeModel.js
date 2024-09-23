const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String,
     required: true },
  ingredients: { type: [String], 
    required: true },
  instructions: { type: String, 
    required: true },
  cuisine: { type: String,
     required: true },
  cookingTime: { type: Number,
    required: true },
  author: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true },
  createdAt: { type: Date, 
    default: Date.now },
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
