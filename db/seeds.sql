DROP TABLE if EXISTS users;
DROP TABLE if EXISTS meals;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email varchar(255) UNIQUE,
  password_digest varchar(255)
);

CREATE TABLE meals(
  id SERIAL PRIMARY KEY,
  apiID varchar(255),
  userID integer references users(id)
)


