const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`insert into FavoriteRecipes values ('${user_id}',${recipe_id})`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from FavoriteRecipes where user_id='${user_id}'`);
    return recipes_id;
}

async function markAsVisited(user_id, recipe_id){
    await DButils.execQuery(`INSERT INTO VisitedRecipes(user_id, recipe_id) VALUES('${user_id}', '${recipe_id}') ON DUPLICATE KEY UPDATE currtime = CURRENT_TIMESTAMP`);

}

async function getVisitedRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from VisitedRecipes where user_id='${user_id}' ORDER BY currtime DESC LIMIT 3`);
    return recipes_id;
}

async function createrecipe(details_dict){
   
    await DButils.execQuery(`
    INSERT INTO recipes VALUES ('0','${details_dict.user_id}','${details_dict.title}', '${details_dict.readyInMinutes}', '${details_dict.image}',
    '${details_dict.popularity}', '${details_dict.vegan}','${details_dict.vegetarian}','${details_dict.glutenFree}','${details_dict.servings}','${details_dict.extendedIngredients}','${details_dict.analyzedInstructions}');`
  );
}

async function getmyRecipes(user_id){
    const recipes_preview = await DButils.execQuery(`select recipe_id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree from recipes where user_id='${user_id}'`);
    return recipes_preview;
}
async function getmyRecipesFullDetailes(user_id, recipe_id){
    const recipes_preview = await DButils.execQuery(`select * from recipes where user_id='${user_id}' and recipe_id = '${recipe_id}'`);
    return recipes_preview;
}
exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;

exports.markAsVisited = markAsVisited;
exports.getVisitedRecipes = getVisitedRecipes;

exports.createrecipe = createrecipe;
exports.getmyRecipes = getmyRecipes;
exports.getmyRecipesFullDetailes= getmyRecipesFullDetailes;