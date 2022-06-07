CREATE TABLE IF NOT EXISTS mydb.MyRecipes(
    user_id int,
    recipe_id VARCHAR(45),
    PRIMARY KEY (user_id,recipe_id),
    FOREIGN KEY (user_id) REFERENCES mydb.users(user_id)
);