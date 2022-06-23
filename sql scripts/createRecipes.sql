-- DROP TABLE mydb.recipes

CREATE TABLE IF NOT EXISTS mydb.recipes(
    recipe_id int AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(100),
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

    