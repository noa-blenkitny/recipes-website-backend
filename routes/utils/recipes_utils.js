const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";



/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */


async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: "90319972dc6242da800bd51717996a05"
            //apiKey: process.env.spooncular_apiKey
        }
    });
}

async function getRandomRecipes(){
    return await axios.get(`${api_domain}/random`,{
        params: {
            number: 10,
            apiKey: "90319972dc6242da800bd51717996a05"
            //apiKey: process.env.spooncular_apiKey
            //limitLicense=true&tags=ipsum ea proident amet occaecat
        }
    });
}

async function getsearchRecipes(){
    return await axios.get(`${api_domain}/complexSearch?query=burger&cuisine=italian&diet=vegetarian&intolerances=gluten&number=10`, {
        params: {
            apiKey: "90319972dc6242da800bd51717996a05"
            //apiKey: process.env.spooncular_apiKey
            //{{baseUrl}}/recipes/complexSearch?query=burger&cuisine=italian&diet=vegetarian&intolerances=gluten&number=10
        }
    });
}

async function getRandomThreeRecipes(){
    let random_pool = await getRandomRecipes();
    let filter_random_pool = random_pool.data.recipes.filter((random)=>(random.instructions!="") && (random.image && random.title))
    if(filter_random_pool.length < 3){
        return getRandomThreeRecipes();
    }
    filter_random_pool.map((info) => {
        info.id
    });
    return getRecipesPreview(filter_random_pool);
}



async function getRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        
    }
}


async function getRecipesPreview(recipes_ids_list) {
    let promises = [];
    recipes_ids_list.map((id) => {
        promises.push(getRecipeDetails(id));
    });
    let info_res = await Promise.all(promises).then((values) => {
        return values;
    });
    
  }



exports.getRecipeDetails = getRecipeDetails;
exports.getRecipesPreview = getRecipesPreview;
exports.getRandomRecipes = getRandomRecipes;
exports.getRandomThreeRecipes = getRandomThreeRecipes;
exports.getsearchRecipes = getsearchRecipes;



