// requiring ma stuff
const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const session = require('express-session');
const bcrypt = require('bcrypt');
const fetch = require('fetch')

// configuring packages
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views'); //for html
app.use("/", express.static(__dirname + '/public')); //for css/js
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'theTruthIsOutThere51',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

var db = pgp('postgres://hillarykane@localhost:5432/recipe_test');

//starting server
var port = process.env.PORT || 2000;
app.listen(port, function() {
  console.log('Recipe app is running on port ' + port);
});


// home index.html
app.get('/',function(req,res){
  res.render('index');
});

//signup index.html
app.get("/signup", function(req, res){
  var logged_in;
  var email;

  if(req.session.user){
    logged_in = true;
    email = req.session.user.email;
  }

  var data = {
    "logged_in": logged_in,
    "email": email
  }

  res.render('signup/index', data);
});

app.post("/signup", function(req, res){
  var data = req.body;
  console.log(data);
  console.log('signup route hit')
  bcrypt.hash(data.password, 10, function(err, hash){
    db.none(
      "INSERT INTO users (email, password_digest) VALUES ($1, $2)",
      [data.email, hash]
      ).then(function(){
        // res.send('User created!');
        res.redirect('/search');
        // alert("Select your allergy and dietary preferences!")
      })
  });
})

// login index.html
app.get('/login', function(req, res){
  var logged_in;
  var email;
  var data = {
    "logged_in": logged_in,
    "email": email
  }

  res.render("login/index", data);
})

app.post("/login", function(req, res){
  var data = req.body;

  db.one(
    "SELECT * FROM users WHERE email = $1",
    [data.email]
    ).catch(function(){
      res.send('Email/Password not found.')
      // res.render('login/index', data)
    }).then(function(user){
      bcrypt.compare(data.password, user.password_digest, function(err, cmp){
        if(cmp){
          req.session.user = user;
          res.redirect('/dashboard/'+user.id);
        } else {
          res.send('Email/Password not found.')
        }
      });
    });
});

app.post('/save', function(req,res){
  if (req.session.user){
    console.log('yey')
    var user = req.session.user.id
    var savedRecipe = req.body.recipe
    db.none(
    "INSERT INTO meals (apiID, userID) VALUES($1, $2)",
    [savedRecipe, user]).then(function(){
      res.redirect('/dashboard/'+user)
    })
  }
})

// search/index.html
app.get('/search',function(req,res){
  res.render('search/index');
});

// search/show.html
app.get('/dashboard/:id',function(req,res){
  db.many("SELECT apiid FROM meals WHERE userid = $1",[req.session.user.id]).then(function(data){
     var mykey = config.MY_KEY;
     var myid = config.MY_ID;
     $.each(data, function(index, value){
        var apiCall = 'http://api.yummly.com/v1/api/recipe/'+value+'?_app_id=' + myid + '&_app_key=' + mykey
      fetch(apiCall).then(function(data){
        return JSON.parse(data)
      }).then(function(json){
        console.log(json)
        res.render('search/show', json);
      })
     })


  })

});



// // search/index.html
// app.get('/search',function(req,res){
//   res.render('search/index');
// });


// from jared's heroku lesson
// app.get('/', function(req, res) {
//     db.any('SELECT * FROM recipes').then(function(data) {
//         var template_data = {
//             messages: data
//         }
//         res.render('index', template_data);
//     });
// });



// $('input:checked') to get all checked boxes
// do for each, concat into string
// add string to ajax get to API as allowed/disallowed diet pref

// get the list of meals returned, append to dom with a "fav"
// button

// fav button should make ajax post to localhost to save meal in db with your user id as ref
