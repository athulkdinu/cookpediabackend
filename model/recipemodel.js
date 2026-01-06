const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    ingredients: {
      type: [String],
      required: true
    },

    instructions: {
      type: [String],
      required: true
    },

    prepTimeMinutes: {
      type: Number,
      required: true
    },

    cookTimeMinutes: {
      type: Number,
      required: true
    },

    servings: {
      type: Number,
      required: true
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true
    },

    cuisine: {
      type: String,
      required: true
    },

    caloriesPerServing: {
      type: Number,
      required: true
    },

    tags: {
      type: [String],
      default: []
    },

    userId: {
      type: Number,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },

    reviewCount: {
      type: Number,
      default: 0
    },

    mealType: {
      type: [String],
      default: []
    }
  });

const recipes = mongoose.model("recipes", recipeSchema);

module.exports = recipes;
