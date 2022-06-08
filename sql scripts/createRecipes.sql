CREATE TABLE IF NOT EXISTS mydb.Recipes(
    recipe_id int AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    readyInMinutes int,
    image VARCHAR(200),
    aggregateLikes int,
    vegan BOOLEAN,
    vegetarian BOOLEAN, 
    glutenFree BOOLEAN,
    servings INT,
    