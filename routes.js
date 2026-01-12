const express = require("express");
const { getAllRecipesController, getHomeRecipesController, registerController, loginController, viewRecipeController, relatedRecipeController } = require("./controller");
const jwtMidlleware = require("./middleware/jwtMiddleware");

const routes =express.Router()
// GET ALL RECIPES
routes.get("/all-recipes", getAllRecipesController);

// GET HOME RECIPES (3 recipes)
routes.get("/home-recipes", getHomeRecipesController);

//register

routes.post("/register", registerController);

//login

routes.post("/login", loginController);

//view recipe

routes.get("/view-recipe/:id",jwtMidlleware,viewRecipeController)

//related recipe

routes.get("/related-recipes",relatedRecipeController)

module.exports = routes;
