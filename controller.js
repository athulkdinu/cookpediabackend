const recipe = require("./model/recipemodel");
const users = require("./model/usermodel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        username, email, password:encryptedPassword, profile: ""
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
      let isuserLoggedin =existingUser.role=="user" ? await bcrypt .compare(password, existingUser.password) : password==existingUser.password;
      if (isuserLoggedin) {
        const token = jwt.sign({email,role:existingUser.role}, process.env.JWTSECRET);
        res.status(200).json({existingUser,token});
      }
      else{
        res.status(401).json(`Invalid credentials`);
      }
    } else {
      res.status(401).json(`invalid email ... please register`);
    }
  } catch (error) {
     res.status(500).json(error); 
  }
};
