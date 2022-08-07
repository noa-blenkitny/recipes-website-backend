-- DROP TABLE mydb.users

CREATE TABLE IF NOT EXISTS mydb.users(
    user_id int AUTO_INCREMENT PRIMARY KEY,
    username varchar(45),
    password varchar(100)
);
