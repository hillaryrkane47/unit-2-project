// requiring ma stuff
const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const session = require('express-session');
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');
// var masonry = require('masonry-layout');
var methodOverride = require('method-override');
var mykey = process.env.MY_KEYY;
var myid = process.env.MY_IDD;
var apiCall = 'http://api.yummly.com/v1/api/recipes?_app_id=' + myid + '&_app_key=' + mykey

// configuring packages
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views'); //for html
app.use("/", express.static(__dirname + '/public')); //for css/js
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'theTruthIsOutThere51',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

var db = pgp(process.env.DATABASE_URL || 'postgres://hillarykane@localhost:5432/recipe_test');

//starting server
var port = process.env.PORT || 2000;
app.listen(port, function() {
  console.log('Recipe app is running on port ' + port);
});


// home index.html
app.get('/', function(req, res) {
  res.render('index');
});

//signup index.html
app.get("/signup", function(req, res) {
  var logged_in;
  var email;

  if (req.session.user) {
    logged_in = true;
    email = req.session.user.email;
  }

  var data = {
    "logged_in": logged_in,
    "email": email
  }

  res.render('signup/index', data);
});

app.post("/signup", function(req, res) {
  var data = req.body;
  console.log(data);
  console.log('signup route hit')
  bcrypt.hash(data.password, 10, function(err, hash) {
    db.none(
      "INSERT INTO users (email, password_digest) VALUES ($1, $2)", [data.email, hash]
    ).then(function() {
      // res.send('User created!');
      res.redirect('/search');
      // alert("Select your allergy and dietary preferences!")
    })
  });
})

// login index.html
app.get('/login', function(req, res) {
  var logged_in;
  var email;
  var data = {
    "logged_in": logged_in,
    "email": email
  }

  res.render("login/index", data);
})

app.post("/login", function(req, res) {
  var data = req.body;
  db.one(
    "SELECT * FROM users WHERE email = $1", [data.email]
  ).catch(function() {
    res.send('Email/Password not found.')

  }).then(function(user) {
    bcrypt.compare(data.password, user.password_digest, function(err, cmp) {
      if (cmp) {
        req.session.user = user;
        res.redirect('/dashboard/' + user.id);
      } else {
        res.send('Email/Password not found.')
      }
    });
  });
});

//logout
app.get('/logout', function(req, res) {
  req.session.user = null;
  res.redirect('/');
})

// search index.html - saving selected meal to DB
app.post('/save', function(req, res) {
  if (req.session.user) {
    console.log('yey')
    var user = req.session.user.id
    var savedRecipe = req.body.recipe
    db.none(
      "INSERT INTO meals (apiID, userID) VALUES($1, $2)", [savedRecipe, user]).then(function() {
      res.redirect('/dashboard/' + user)
    })
  }
})

// search/index.html - rendering search page
app.get('/search', function(req, res) {
  if (!req.session.user){
    res.redirect('/')
  } else {
    res.render('search/index');
  }

});

// search/show.html - rendering saved meals on dashboard
app.get('/dashboard/:id', function(req, res) {
  console.log(mykey)
  db.many("SELECT apiid, id FROM meals WHERE userid = $1", [req.session.user.id]).then(function(data) {
    var recipes = { recipes: [] }
    data.forEach(function(value) {
      var apiCall = 'http://api.yummly.com/v1/api/recipe/' + value.apiid + '?_app_id=' + myid + '&_app_key=' + mykey
      fetch(apiCall).then(function(data) {
        return data.json(data)
      }).then(function(json) {
        recipes.recipes.push(json)
        if (recipes.recipes.length === data.length) {
          res.render('search/show', recipes);
        }
      })
    })

  }).catch(function(error){
    console.log(error)
    res.redirect('/search')
  })
});
//remove a recipe from dashboard
app.delete('/dashboard', function(req, res) {
  if (req.session.user) {
    // console.log('woop')
    var user = req.session.user.id
    var savedMeal = req.body.meal
    db.none("DELETE FROM meals WHERE apiId=$1 AND userid=$2", [savedMeal, user]).then(function(){
        res.redirect('/dashboard/' + user);
    })
  }
});
