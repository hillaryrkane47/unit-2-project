$(document).ready(function() {
  console.log('script loaded.')

  var mykey = config.MY_KEY;
  var myid = config.MY_ID;
  var apiCall = 'http://api.yummly.com/v1/api/recipes?_app_id=' + myid + '&_app_key=' + mykey

  $(".search-again").hide();

  $("#preferences").on("submit", function(e) {
    console.log("preferences")
    e.preventDefault();
    showResults();
  });

  var showResults = function() {
    $("#search-boxes").hide();
    $(".search-again").show();
    getRecipes();
    $(".search-again").on("click", function() {
      clearSearchResults();
    })
  }

  var clearSearchResults = function() {
      $("#search-boxes").show();
      $(".search-again").hide();
      $(".results").hide();

  }

//adding checked dietary parameters to ajax url call
  var matchPrefsUrl = function() {
    var inputs = $('input');
    var string = "";
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].checked === true) {
        string += inputs[i].value;
      }
    }
    return string;
  };

  //showing recipe results
  var getRecipes = function(allergy, diet, course, cuisine) {
    var something = matchPrefsUrl();
    console.log(something);
    $.ajax({
      url: apiCall + something + '&requirePictures=true&maxResult=50&start=50',
      method: "GET"
    }).done(function(data) {
      console.log(data);
      var matches = data.matches;
      for (var i = 0; i < matches.length; i++) {
        var container =
        $("<div class='grid'></div>");
        var saveForm = $("<form class='saveF' action='/save' method='POST'></form>");
        var saveInput = $("<input class='saveI' type='hidden' name='recipe' value='" + matches[i].id + "'>")
        var saveButton = $("<button class='btn btn-outline-info' type='submit'>Save Me</button>");
        $(".results").append(container);
        var img = $("<img src='" + matches[i].imageUrlsBySize['90'] + "' class='grid-item'>");
        var title = $("<h4>" + matches[i].recipeName + "</h4>");
        saveForm.append(saveButton).append(saveInput)
        container.append(img).append(title).append(saveForm)

      }

    })
  };


}); // ends doc.ready
