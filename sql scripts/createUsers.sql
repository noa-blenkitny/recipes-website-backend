-- DROP TABLE mydb.users


-- CREATE TABLE IF NOT EXISTS mydb.users(
--     user_id int AUTO_INCREMENT PRIMARY KEY,
--     username varchar(45),
--     firstname varchar(45),
--     lastname varchar(45),
--     country varchar(45),
--     password varchar(100),
--     email varchar(45)
-- );


CREATE TABLE IF NOT EXISTS mydb.users(
    user_id int AUTO_INCREMENT PRIMARY KEY,
    username varchar(45),
    password varchar(100)
);
