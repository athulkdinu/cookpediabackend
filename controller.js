const recipe = require("./model/recipemodel");

// GET ALL RECIPES
exports.getAllRecipesController = async (req, res) => {
  console.log("inside get all recipes controller");

  try {
    const allRecipes = await recipe.find();
    res.status(200).json(allRecipes);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET HOME (3 RECIPES)
exports.getHomeRecipesController = async (req, res) => {
  console.log("inside home recipes controller");

  try {
    const homeRecipes = await recipe.find().limit(3);
    res.status(200).json(homeRecipes);
  } catch (error) {
    res.status(500).json(error);
  }
};
