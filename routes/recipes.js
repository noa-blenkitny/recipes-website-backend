var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");
const DButils = require("./utils/DButils");

router.get("/", (req, res) => res.send("im here"));

/**
 * check if a user is logged in 
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
    req.session.user_id = null
    next();
  }
});


/**
 * This path returns a preview details of a recipe by its id
 */
router.get("/recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeDetails(req.query.recipeId,req.session.user_id);
    // const result = recipes_utils.getRecipeDetails(recipe);
    res.send(recipe);
    // res.send(req.query.recipeId)
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns 3 random preview recipes
 */
 router.get("/random", async (req, res, next) => {
   try{
     let random_3_recipes = await recipes_utils.getRandomThreeRecipes(req.session.user_id);
     res.status(200).send(random_3_recipes);
   }catch (error){
      next(error);
   }
  });
/**
 * This path returns a full details of a recipe by its id
 */
 router.get("/fullDetailes", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getFullRecipeDetails(req.query.recipeId, req.session.user_id);
    res.send(recipe);
    // res.send(req.query.recipeId)
  } catch (error) {
    next(error);
  }
});

router.get("/search/query/:searchQuery/number/:num", async (req, res, next) => {
//router.get("/search/query", async (req, res, next) => {
  const {searchQuery, num} = req.params;
  //set search params
  search_params = {};
  search_params.query = searchQuery;
  search_params.number = num;
  search_params.instructionsRequired =  true;
  search_params.apiKey = process.env.spooncular_apiKey;
  search_params.addRecipeInformation = true;

  //gives a defult number
  if (num != 5 && num != 10 && num != 15)
  {
    search_params.number = 5;
  }
  //check if query params exists (cuisine / diet / intolerances) and add them to search_params
  recipes_utils.extractQueryParams(req.query, search_params);

  try {
    const recipes = await recipes_utils.searchForRecipes(search_params, req.session.user_id);
    // const recipes_data = await recipes_utils.getSearchRecipeDetails(recipes);
    if (recipes.length === 0)
    {
      res.status(204).send("no recipes found for this query");
    }
    else
    {
      res.status(200).send(recipes);
    }
    
  } catch (error) {
    next(error);
  }
  
});



module.exports = router;
