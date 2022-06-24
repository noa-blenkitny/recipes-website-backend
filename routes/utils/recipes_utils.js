const axios = require("axios");
const { type } = require("express/lib/response");
const api_domain = "https://api.spoonacular.com/recipes";
const user_utils = require("./user_utils");




/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */


async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
}

async function extractPreviewRecipeDetailes(recipes_info,user_id = null)
{
    return await Promise.all(recipes_info.map(async (recipe_info) => {
        let data = recipe_info;
        if (recipe_info.data)
        {
            data = recipe_info.data
        }
        const {
            id,
            title,
            readyInMinutes,
            image,
            aggregateLikes,
            vegan,
            vegetarian, 
            glutenFree, 
        } = data;

        let isFavorite = await user_utils.checkIfFavorite(id,user_id);
        let isVisited = await user_utils.checkIfVisited(id,user_id);
    
        return {
            id: id,
            title: title,
            readyInMinutes: readyInMinutes,
            image: image,
            popularity: aggregateLikes,
            vegan: vegan,
            vegetarian: vegetarian,
            glutenFree: glutenFree,
            isFavorite : isFavorite ,
            isVisited :  isVisited
        }
    }))
}

async function getRandomRecipes(){
    const response =  await axios.get(`${api_domain}/random`,{
        params: {
            number: 10,
            apiKey: process.env.spooncular_apiKey
        }
    });
    return response;
}

async function getRecipesPreview(recipes_ids_list, user_id = null) {
    let promises = [];
    recipes_ids_list.map((id) => {
        promises.push(getRecipeInformation(id));
    });
    let info_res = await Promise.all(promises);
    let res = await extractPreviewRecipeDetailes(info_res, user_id);
    return res;
  }
async function getRecipesFullDetailes(recipes_ids_list, user_id = null) {
let promises = [];
recipes_ids_list.map((id) => {
    promises.push(getFullRecipeDetails(id, user_id = null));
});
let info_res = await Promise.all(promises);
return info_res
}

  async function getRecipeDetails(recipe_id, user_id = null) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;
    let  isFavorite = await user_utils.checkIfFavorite(recipe_id,user_id) ;
    let isVisited = await user_utils.checkIfVisited(recipe_id,user_id);

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        isFavorite: isFavorite,
        isVisited: isVisited
        
    }
}

async function getSearchRecipeDetails(serach_ingp,user_id = null ) {
    let data = serach_ingp.data;
    let result = data.results;
    let total_results = data.totalResults;
    let recipes_id = result.map((res) => (res.id));
    //if we want the instructions and the preview
    let recipe_preview = await getRecipesFullDetailes(recipes_id, user_id)
    //if we only need the preview
    // let recipe_preview = await getRecipesPreview(recipes_id);
    return recipe_preview;
   
}

async function getFullRecipeDetails(recipe_id, user_id = null) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let isFavorite = await user_utils.checkIfFavorite(recipe_id,user_id);
    let isVisited = await user_utils.checkIfVisited(recipe_id,user_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, extendedIngredients, servings, analyzedInstructions } = recipe_info.data;
    // extendedIngredients = extendedIngredients.map((ing) => ({name:ing.name, amount: ing.amount, unit:ing.unit}))
    //analyzedInstructions = analyzedInstructions.map((instruction) => ({name:instruction.name, steps: (instruction.steps).map((inStep)=> ({number:inStep.number, step:inStep.step}))}))
    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        extendedIngredients: extendedIngredients,
        servings: servings,
        analyzedInstructions: analyzedInstructions,
        isFavorite: isFavorite,
        isVisited: isVisited
        
    }
}
 async function extractFullRecipeDetailsForSearch(recipe_full_detailes,user_id) {
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, extendedIngredients, servings, analyzedInstructions } = recipe_full_detailes;
    analyzedInstructions = analyzedInstructions.map((instruction) => ({name:instruction.name, steps: (instruction.steps).map((inStep)=> ({number:inStep.number, step:inStep.step}))}))
    let isFavorite = await user_utils.checkIfFavorite(id,user_id);
    let isVisited = await user_utils.checkIfVisited(id,user_id);
    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        extendedIngredients: extendedIngredients,
        servings: servings,
        analyzedInstructions: analyzedInstructions,
        isFavorite: isFavorite,
        isVisited: isVisited
    }
}
async function getRandomThreeRecipes(user_id=null){
    let random_pool = await getRandomRecipes();
    let filter_random_pool = random_pool.data.recipes.filter((random)=>(random.instructions!="") && (random.image && random.image != ""))
    if(filter_random_pool.length < 3){
        return getRandomThreeRecipes(user_id);
    }

    let res = await  extractPreviewRecipeDetailes([filter_random_pool[0], filter_random_pool[1], filter_random_pool[2]],user_id);
    return res;
}
 function extractQueryParams(query, search_params)
 {
     if ("cuisine" in query)
     {
         search_params.cuisine = query.cuisine;
     }
     if ("diet" in query)
     {
         search_params.diet = query.diet;
     }
     if ("intolerances" in query)
     {
         search_params.intolerances = query.intolerances;
     }
     if ("sort" in query)
     {
         search_params.sort = query.sort;
     }
 }

async function searchForRecipes(search_params, user_id = null)
{
    const response =  await axios.get(`${api_domain}/complexSearch`,{
        params: search_params
        
    });
    let data = response.data;
    let result = data.results;
    let filter_search_pool = result.filter((recipe)=>(recipe.instructions!=""))
    let total_results = data.totalResults;
    if (search_params.number > filter_search_pool.length && total_results > search_params.number )
    {
        search_params.number++;
        searchForRecipes(search_params, user_id)
    }
    // let recipes_id = filter_search_pool.map((res) => (res.id));
     let recipe_full_detailes = Promise.all(filter_search_pool.map(async(res) => (extractFullRecipeDetailsForSearch(res, user_id))));


    //if we want the instructions and the preview
    // let recipe_full_detailes = await getRecipesFullDetailes(recipes_id)
    
    //if we only need the preview
    // let recipe_preview = await getRecipesPreview(recipes_id);
    return recipe_full_detailes;
    // return filter_search_pool;
}


exports.getRecipeDetails = getRecipeDetails;
exports.getRecipesPreview = getRecipesPreview;
exports.getRandomThreeRecipes = getRandomThreeRecipes;
exports.getFullRecipeDetails = getFullRecipeDetails;
exports.extractQueryParams = extractQueryParams;
exports.searchForRecipes = searchForRecipes;
exports.getSearchRecipeDetails = getSearchRecipeDetails;
