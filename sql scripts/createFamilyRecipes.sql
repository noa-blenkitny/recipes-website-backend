-- DROP TABLE mydb.familyRecipes

-- CREATE TABLE IF NOT EXISTS mydb.familyRecipes(
--     recipe_id int AUTO_INCREMENT PRIMARY KEY,
--     user_id INT,
--     title VARCHAR(100),
--     summary VARCHAR(200),
--     readyInMinutes int,
--     image MEDIUMTEXT,
--     aggregateLikes int,
--     vegan BOOLEAN,
--     vegetarian BOOLEAN, 
--     glutenFree BOOLEAN,
--     servings INT,
--     extendedIngredients MEDIUMTEXT NOT NULL,
--     analyzedInstructions MEDIUMTEXT NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES mydb.users(user_id)
    
-- );
-- -- brownies
-- INSERT INTO mydb.familyRecipes (recipe_id, user_id, title, summary, readyInMinutes, image,aggregateLikes, vegan, vegetarian, glutenFree, servings,  extendedIngredients, analyzedInstructions)
-- VALUES (1, 1, 'Grandma''s Brownies', 'Grandma Aviva makes this brownies for every grandchild''s birthday!',45,'https://img.delicious.com.au/PKWN2rUp/w759-h506-cfill/del/2015/10/gingerbread-brownies-14280-1.jpg',
-- 0,0,1,0,16,'1/2 cup butter$$$1 cup white sugar$$$2 eggs$$$1 teaspoon vanilla extract$$$1/3 cup unsweetened coca powder$$$1/2 cup all purpose flour$$$ 1/4 teaspoon salt$$$1/4 teaspoon baking powder',
-- 'Preheat oven to 175 degrees. Grease and flour an 8-inch square pan$$$In a large saucepan, melt 1/2 cup butter. Remove from heat, and stir in sugar, eggs, and 1 teaspoon vanilla. Beat in 1/3 cup cocoa, 1/2 cup flour, salt, and baking powder. Spread batter into prepared pan.$$$Bake in preheated oven for 25 to 30 minutes.$$$ENJOY');


-- -- Pizza
-- INSERT INTO mydb.familyRecipes (recipe_id, user_id, title, summary, readyInMinutes, image,aggregateLikes, vegan, vegetarian, glutenFree, servings,  extendedIngredients, analyzedInstructions)
-- VALUES (2, 1, 'Karel''s Pizza', 'Mother Karel makes this special pizza when My Family and I gather for family evenings and enjoy quality time together',140,'https://realfood.tesco.com/media/images/1400x919-MargaritaPizza-555a4065-2573-4b41-bcf3-7193cd095d8f-0-1400x919.jpg',
-- 0,0,1,0,8,'1.25 cups warm water$$$1 teaspoon active dry yeast$$$3 cups bread flour$$$1.5 teaspoons fine salt$$$0.25 cup olive oil$$$1 can plain crushed tomatoes$$$1 can pizza sauce$$$8 ounces mozzarella, very thinly sliced$$$0.25 cup grated Pecorino Romano cheese',
-- 'Combine water and yeast in a small bowl. Let stand until yeast softens and begins to form a creamy foam, about 5 minutes.$$$Combine flour and salt together in the bowl of a stand mixer fitted with a dough hook attachment. Pour in yeast mixture. Knead dough until smooth, about 7 minutes.$$$Grease a large bowl lightly with olive oil. Form dough into a tight ball and lightly grease the top. Place in the bowl; cover loosely with plastic wrap. Let rise until doubled in volume, about 30 minutes.
-- $$$Mix crushed tomatoes and pizza sauce together in a bowl to make sauce.$$$Grease a heavy-gauge rimmed 12x17-inch baking sheet generously with olive oil. Press dough into the bottom. Prick dough all over with a fork. Arrange mozzarella cheese slices over dough; cover with 1 cup sauce. Sprinkle Pecorino Romano cheese on top. Drizzle remaining olive oil over pizza.$$$Let pizza rise in a warm area until puffy, about 1 hour.$$$Preheat oven to 230 degrees.$$$Bake pizza on the center rack of the preheated oven until edges are very dark brown but top is not burnt, 15 to 20 minutes. Cool in the pan for 5 minutes before slicing into squares.');


-- -- quiche
-- INSERT INTO mydb.familyRecipes (recipe_id, user_id, title, summary, readyInMinutes, image,aggregateLikes, vegan, vegetarian, glutenFree, servings,  extendedIngredients, analyzedInstructions)
-- VALUES (3, 1, 'Tal''s Broccoli Quiche', 'Father Tal makes this yummi broccoli quiche every year for Shavuot eve',50,'https://www.foodisgood.co.il/wp-content/uploads/2017/07/broccoli-quiche.jpg',
-- 0,0,1,0,6,'3 tablespoons butter, divided$$$2 cups chopped fresh broccoli$$$,1 onion, minced$$$1 teaspoon minced garlic$$$1 unbaked pie crust$$$1 cup shredded mozzarella cheese$$$4 eggs, well beaten$$$1 cup milk$$$1/2 teaspoon black pepper$$$1 teaspoon salt$$$1 tablespoon butter, melted',
-- 'Preheat the oven to 175 degrees$$$Melt 2 tablespoons butter in a large saucepan over medium-low heat. Add broccoli, onion, and garlic; cook, stirring occasionally, until vegetables are soft. Spoon vegetables into pie crust and sprinkle with mozzarella cheese; set quiche on a baking sheet.$$$Combine eggs and milk together in a bowl; season with salt and pepper. Stir in remaining 1 tablespoon melted butter; pour egg mixture over vegetables.$$$Bake in preheated oven until the center of the quiche has set, about 30 to 50 minutes.');