-- DROP TABLE mydb.FavoriteRecipes


-- CREATE TABLE IF NOT EXISTS mydb.FavoriteRecipes(
--     user_id int,
--     recipe_id VARCHAR(45),
--     PRIMARY KEY (user_id,recipe_id),
--     FOREIGN KEY (user_id) REFERENCES mydb.users(user_id)
-- );