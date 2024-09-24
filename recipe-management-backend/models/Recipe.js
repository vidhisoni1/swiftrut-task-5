const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: { type: String,
     required: true },
  ingredients: { type: [String], 
    required: true },
  instructions: { type: String,
     required: true },  // Instructions
  cuisineType: { type: String,
     required: true },   //  type 
  cookingTime: { type: String, 
    required: true },   // Cooking time 
  image: { type: String },                         // image
  author: { type: mongoose.Schema.Types.ObjectId,
    ref: 'User', required: true }
}, 
{ timestamps: true });

module.exports = mongoose.model('Recipe',RecipeSchema);
