
CREATE TABLE IF NOT EXISTS mydb.VisitedRecipes(
    user_id int,
    recipe_id VARCHAR(45),
    currtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY (user_id,recipe_id),
    FOREIGN KEY (user_id) REFERENCES mydb.users(user_id)
);