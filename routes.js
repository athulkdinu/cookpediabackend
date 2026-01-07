const express = require("express");
const router = express.Router();
const { getAllRecipesController, getHomeRecipesController, registerController, loginController } = require("./controller");

// GET ALL RECIPES
router.get("/all-recipes", getAllRecipesController);

// GET HOME RECIPES (3 recipes)
router.get("/home-recipes", getHomeRecipesController);

//register

router.post("/register", registerController);

//login

router.post("/login", loginController);

module.exports = router;
