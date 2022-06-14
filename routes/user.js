var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users").then((users) => {
      if (users.find((x) => x.user_id === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});


/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    await user_utils.markAsFavorite(user_id,recipe_id);
    res.status(200).send("The Recipe successfully saved as favorite");
    } catch(error){
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    let favorite_recipes = {};
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

/**
 * This path gets body with recipeId and save this recipe in the visited list of the logged-in user
 */
 router.post('/visited', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    await user_utils.markAsVisited(user_id,recipe_id);
    res.status(200).send("The Recipe successfully saved as visited");
    } catch(error){
    next(error);
  }
})
/**
 * This path returns the visited recipes that were saved by the logged-in user
 */
 router.get('/visited', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipes_id = await user_utils.getVisitedRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

/**
 * This path create recipe in the data base
 */
 router.post('/createrecipe', async (req,res,next) => {
  try{
    let details = {};
    details.user_id = req.session.user_id;
    details.title = req.body.title;
    details.readyInMinutes = req.body.readyInMinutes;
    details.image = req.body.image;
    details.popularity = req.body.popularity;
    details.vegan = req.body.vegan;
    details.vegetarian = req.body.vegetarian;
    details.glutenFree = req.body.glutenFree;
    details.extendedIngredients = req.body.extendedIngredients;
    details.servings = req.body.servings;
    details.analyzedInstructions = req.body.analyzedInstructions;


    await user_utils.createrecipe(details);
    res.status(200).send("The Recipe successfully saved");
    } catch(error){
      next(error);
  }
});

/**
 * This path returns the preview of the recipes that were created by the logged-in user
 */
 router.get('/myrecipes', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipes_preview = await user_utils.getmyRecipes(user_id);
    // let recipes_id_array = [];
    // recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    // const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(recipes_preview);
  } catch(error){
    next(error); 
  }
});

/**
 * This path returns the full detailes of the recipe that were created by the logged-in user
 */
 router.get('/myrecipes/fulldetailes', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    const recipes_detailes = await user_utils.getmyRecipesFullDetailes(user_id,recipe_id);
    // let recipes_id_array = [];
    // recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    // const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    if (recipes_detailes.length === 0)
    {
      res.status(204).send({message: "no recipes found",success : true});
    }
    else
    {
      res.status(200).send(recipes_detailes);
    }
  } catch(error){
    next(error); 
  }
});
/**
 * This path returns the preview of the recipes that were created by the logged-in user
 */
 router.get('/familyrecipes', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipes_preview = await user_utils.getFamilyRecipes(user_id);
    // let recipes_id_array = [];
    // recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    // const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(recipes_preview);
  } catch(error){
    next(error); 
  }
});

/**
 * This path returns the full detailes of the recipe that were created by the logged-in user
 */
 router.get('/familyrecipes/fulldetailes', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    const recipes_detailes = await user_utils.getFamilyRecipesFullDetailes(user_id,recipe_id);
    // let recipes_id_array = [];
    // recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    // const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    if (recipes_detailes.length === 0)
    {
      res.status(204).send({message: "no recipes found",success : true});
    }
    else
    {
      res.status(200).send(recipes_detailes);
    }
  } catch(error){
    next(error); 
  }
});

module.exports = router;
