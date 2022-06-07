const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`insert into FavoriteRecipes values ('${user_id}',${recipe_id})`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from FavoriteRecipes where user_id='${user_id}'`);
    return recipes_id;
}

async function markAsVisited(user_id, recipe_id){
    // await DButils.execQuery(`insert into VisitedRecipes (user_id, recipe_id) values ('${user_id}',${recipe_id})`);
    await DButils.execQuery(`IF(EXISTS(select recipe_id from VisitedRecipes where user_id='${user_id}' and recipe_id='${recipe_id}')) THEN
        UPDATE VisitedRecipes
        SET currtime=CURRENT_TIMESTAMP
        where user_id='${user_id}' and recipe_id='${recipe_id}';
    ELSE
        insert into VisitedRecipes values ('${user_id}',${recipe_id});
    END IF;
    `);
    // await DButils.execQuery(`insert into VisitedRecipes values ('${user_id}',${recipe_id}) on duplicate key update VisitedRecipes set currtime=CURRENT_TIMESTAMP where user_id='${user_id}' and recipe_id='${recipe_id}'`);

}
// `IF(EXISTS(select recipe_id from VisitedRecipes where user_id='${user_id}' and recipe_id='${recipe_id}')`
// BEGIN
//    Statement 1;
// END

// ELSE IF (Expression 2)
// BEGIN
//    Statement 2;
// END
// ..........
// ELSE 
// BEGIN
//    Default Statement;
// END

async function getVisitedRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from VisitedRecipes where user_id='${user_id}' ORDER BY time DESC LIMIT 3`);
    return recipes_id;
}



exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;

exports.markAsVisited = markAsVisited;
exports.getVisitedRecipes = getVisitedRecipes;
