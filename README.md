# Recipe App

## Description: This app will allow visitors to search the Yummly api based on allergy, course, and cuisine. If you create an account, you can add/remove favorite recipes to your dashboard and and continue to searching recipes that fit your dietary needs and preferences.
* Supported allergies include: Dairy, Egg, Gluten, Peanut, Seafood, Sesame, Soy, Sulfite, Tree Nut, Wheat.
* Supported courses include: Main Dishes, Desserts, Side Dishes, Lunch, Snacks, Appetizers, Salads, Breads, Breakfast and Brunch, Soups, Beverages, Condiments and Sauces, Cocktails.
* Supported cuisines include: American, Italian, Asian, Mexican, Southern & Soul Food, French, Southwestern, Barbecue, Indian, Chinese, Cajun & Creole, English, Mediterranean, Greek, Spanish, German, Thai, Moroccan, Irish, Japanese, Cuban, Hawaiin, Swedish, Hungarian, Portugese.
* Link to hosted app on heroku: 

## User Stories

* As a user, I can search the database to browse recipes.
* As a user, I can filter my search based on allergy, diet, course, and cuisine.
* As a user, I can save recipes on my dashboard.
* As a user, I can delete a recipe from my dashboard.
* As a user, I can view my collection of recipes at any point.

##Pseudo Code & Planning Phase

* C - creating call to recipes
* R - read/display available recipes
* U - update dashboard by adding saved recipes
* D - delete recipes from dashboard

* Database holds 2 tables: Users & Meals
* Users table values: id, email, password
* Meals table values: id, apiID, userID (referencing users ID)

##Wireframe/ERG (lol)
![ScreenShot](crazy_planning.png)
![ScreenShot](erg.png)

## Darn I wish I...../Reach Goalz
If I were better at coding, and had more time, I would have liked to change:
* I struggled with alloting enough time to style this app the way I wanted.
* I wish I had enough time to add the option to search recipes with a search form, using key words (ex: Cookies) 
* I really wish that I had time to add animations, display the recipe images using masonry (http://masonry.desandro.com/).
* I would have liked for the user to save their search preferences.
* I would have liked for the user to save multiple recipes on the same page, rather than saving one recipe and being redirected to their dashboard.
* I wish the user's login information was display in the header.

## Shout outs <3:

* [Yummly](http://www.yummly.com/) for letting me use their API for free as a student, rather than the normal $500/month fee they charge other users. 
* Marcos for helping me understand the flow of the server side vs. client side.
* Nick (t/a Nick) for staying at school until the wee hours of the night singing showtunes and debugging my code.


### Tools on tools on tools

[Yummly](https://developer.yummly.com/documentation#Metadata), [Mustache](https://github.com/janl/mustache.js), [Jquery](http://jquery.com/), [Stack Overflow](http://stackoverflow.com/), [Animate CSS](https://daneden.github.io/animate.css/), [JS HINT](http://jshint.com/), [MDN](https://developer.mozilla.org), [Trello](https://trello.com); [Prettifier](http://jsbeautifier.org/)
