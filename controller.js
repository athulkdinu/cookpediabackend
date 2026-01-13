const recipes = require("./model/recipemodel");
const recipe = require("./model/recipemodel");
const users = require("./model/usermodel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saveRecipes = require("../backend/model/savedRecipeModel");

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

//register controller

exports.registerController = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(401).json(`User already exist`);
    } else {

      const encryptedPassword = await bcrypt.hash(password, 10);
      console.log(encryptedPassword);

      const newUser = new users({
        username, email, password: encryptedPassword, profile: ""
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//login

exports.loginController = async (req, res) => {
  console.log("inside logincontroller");

  const { email, password } = req.body;
  console.log(email, password);
  try {

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      let isuserLoggedin = existingUser.role == "user" ? await bcrypt.compare(password, existingUser.password) : password == existingUser.password;
      if (isuserLoggedin) {
        const token = jwt.sign({ email, role: existingUser.role }, process.env.JWTSECRET);
        res.status(200).json({ user: existingUser, token });
      }
      else {
        res.status(401).json(`Invalid credentials`);
      }
    } else {
      res.status(401).json(`invalid email ... please register`);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a single recipe
exports.viewRecipeController = async (req, res) => {
  console.log("inside viewrecipe controller");
  const { id } = req.params
  try {
    const viewDetails = await recipes.findById(id)
    res.status(200).json(viewDetails)
  } catch (error) {
    res.status(500).json(error)
  }
}

// related Recipe Controller
exports.relatedRecipeController = async (req, res) => {
  console.log("Inside Related Recipe Controller");
  const cuisine = req.query.cuisine

  try {
    const relatedRecipe = await recipes.find({ cuisine })
    res.status(200).json(relatedRecipe)

  } catch (error) {
    res.status(500).json(error)
  }

  //add to collection
  exports.addToSavedRecipeController = async (req, res) => {
    console.log("Inside add To saved Recipe Controller");
    //get id,mail,name,image
    const { name, image } = req.body
    const { id } = req.params
    const userMail = req.payload
    try {
      const existingRecipe = await saveRecipes.findOne({ recipeId: id, userMail })
      if (existingRecipe) {
        res.status(409).json("Recipe already in your collection!!! Please add another...")
      } else {
        const newRecipe = new saveRecipes({
          recipeId: id, recipeName: name, recipeImage: image, userMail
        })
        await newRecipe.save()
        res.status(200).json(newRecipe)
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }

  //get all saved recipe of a user
  exports.getSavedRecipesController = async (req, res) => {
    console.log("Inside getSavedRecipesController");
    const userMail = req.payload
    try {
      const allSavedRecipes = await saveRecipes.find({ userMail })
      res.status(200).json(allSavedRecipes)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  //remove save recipe
  exports.deleteSaveRecipeController = async (req, res) => {
    console.log("Inside deleteSaveRecipeController");
    const { id } = req.params
    try {
      const deleteRecipe = await saveRecipes.findByIdAndDelete({ _id: id })
      res.status(200).json(deleteRecipe)
    } catch (err) {
      res.status(500).json(err)
    }
  }


}
