$(document).ready(function() {
  console.log('script loaded.')

  var mykey = config.MY_KEY;
  var myid = config.MY_ID;
  var apiCall = 'http://api.yummly.com/v1/api/recipes?_app_id=' + myid + '&_app_key=' + mykey

  $(".again").hide();

  $("#preferences").on("submit", function(e) {
    e.preventDefault();
    $("#search-boxes").hide();
    $(".again").show();

    getRecipes();
  });

  var display = function() {
    $("#submit-prefs").on("click", function() {
      console.log('yay')
      $("#search-boxes").show();
      $(".again").hide();
    })
  }
  display();
  var matchPrefsUrl = function() {
    var inputs = $('input');
    var string = "";
    for (var i = 0; i < inputs.length; i++) {
      // console.log(inputs)
      if (inputs[i].checked === true) {
        // console.log(inputs[i].value);
        string += inputs[i].value;
      }
    }
    return string;
  };
  var getRecipes = function(allergy, diet, course, cuisine) {
    var something = matchPrefsUrl();
    console.log(something);
    $.ajax({
      url: apiCall + something + '&requirePictures=true',
      method: "GET"
    }).done(function(data) {
      console.log(data);
      var matches = data.matches;
      for (var i = 0; i < matches.length; i++) {
        var container = $("<div class='grid'></div>");
        var saveForm = $("<form class='saveF' action='/save' method='POST'></form>");
        var saveInput = $("<input class='saveI' type='hidden' name='recipe' value='" + matches[i].id + "'>")
        var saveButton = $("<button class='saveB' type='submit'>Save Me</button>");
        $(".results").append(container);
        var img = $("<img src='" + matches[i].imageUrlsBySize['90'] + "'>");
        var title = $("<h4>" + matches[i].recipeName + "</h4>");
        saveForm.append(saveButton).append(saveInput)
        container.append(img).append(title).append(saveForm)

      }

    })
  }


  // example call url
  // http://api.yummly.com/v1/api/recipes?_app_id=cd398e99&_app_key=8982613185a8f51697a7e3a0e544ff3b&allowedAllergy[]=396^Dairy-Free&allowedDiet[]=388^Lacto%20vegetarian&allowedAllergy[]=393^Gluten-Free




}); // ends doc.ready
