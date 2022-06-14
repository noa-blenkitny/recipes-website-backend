CREATE TABLE IF NOT EXISTS mydb.familyRecipes(
    recipe_id int AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(100),
    summary VARCHAR(200),
    readyInMinutes int,
    image VARCHAR(200),
    aggregateLikes int,
    vegan BOOLEAN,
    vegetarian BOOLEAN, 
    glutenFree BOOLEAN,
    servings INT,
    extendedIngredients MEDIUMTEXT NOT NULL,
    analyzedInstructions MEDIUMTEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES mydb.users(user_id)
    
);