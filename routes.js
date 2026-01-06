const express = require("express");
const router = express.Router();
const { getAllRecipesController, getHomeRecipesController } = require("./controller");

// GET ALL RECIPES
router.get("/all-recipes", getAllRecipesController);

// GET HOME RECIPES (3 recipes)
router.get("/home-recipes", getHomeRecipesController);

module.exports = router;
