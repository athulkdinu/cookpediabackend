const express = require("express");
const { getAllRecipesController, getHomeRecipesController, registerController, loginController, viewRecipeController, relatedRecipeController, addToSavedRecipeController, getSavedRecipesController, deleteSaveRecipeController, addToDownloadController, getDownloadedRecipesController, updateProfileController, getAllUsersController } = require("./controller");
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


//save receipie 
routes.post("/recipes/:id/save",jwtMidlleware,addToSavedRecipeController)

//getsaved receipei
routes.get("/recipes/saved", jwtMidlleware,getSavedRecipesController);
//delete
routes.delete("/saved-receipes/:id/remove",jwtMidlleware, deleteSaveRecipeController);
//download recipe
routes.put("/recipes/:id/download", jwtMidlleware, addToDownloadController);
//get downloaded recipes
routes.get("/user-downloads", jwtMidlleware, getDownloadedRecipesController);
//update
routes.put("/update-profile",jwtMidlleware,updateProfileController)
//users
// get all users
routes.get("/all-users", getAllUsersController)
module.exports = routes;
