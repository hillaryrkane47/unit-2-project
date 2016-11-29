DROP TABLE if EXISTS users;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email varchar(250) UNIQUE,
  password_digest varchar(250)
);


-- Supported Allergies
-- Dairy, Egg, Gluten, Peanut, Seafood, Sesame, Soy, Sulfite, Tree Nut, Wheat

-- Supported Diets
-- Lacto vegetarian, Ovo vegetarian, Pescetarian, Vegan, Vegetarian

-- Supported Cuisines
-- American, Italian, Asian, Mexican, Southern & Soul Food, French, Southwestern, Barbecue, Indian, Chinese, Cajun & Creole, English, Mediterranean, Greek, Spanish, German, Thai, Moroccan, Irish, Japanese, Cuban, Hawaiin, Swedish, Hungarian, Portugese

-- Supported Courses
-- Main Dishes, Desserts, Side Dishes, Lunch and Snacks, Appetizers, Salads, Breads, Breakfast and Brunch, Soups, Beverages, Condiments and Sauces, Cocktails
