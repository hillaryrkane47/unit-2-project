$(document).ready(function() {
  console.log('script loaded.')

var mykey = config.MY_KEY;
var myid = config.MY_ID;

var getData = function(recipes){
  console.log('??')
  $.ajax({
    url:'http://api.yummly.com/v1/api/recipes?_app_id=' + myid + '&_app_key=' + mykey,
    method: "GET"
  })
  .done(function(data){
    console.log('works!')
    console.log(data);
  })
}

$("#search-btn").on('click', function(){
  getData()
})

// $("#sign-up-btn").on('submit', function(event){
//   event.preventDefault();
//   var email = $(this).children('#signup-email').val();
//   var password = $(this).children('#signup-pw').val();
//   var fullUserSignin = {email:email, password:password};
//   // console.log('script connected');
//   $.ajax({
//     url: '/signup',
//     method: 'post',
//     data: 'fullUserSignin',
//     success: function(fullUser){
//       console.log('post success')
//       window.location = '/preferences'
//     }
//   })
// })

// $("#log-in-btn").on('submit', function(event){
//   event.preventDefault();
//   var email = $(this).children('#login-email').val();
//   var password = $(this).children('#login-pw').val();
//   var fullUserLogin = {email:email, password:password};
//   console.log('script connected');
//   $.ajax({
//     url: '/login',
//     method: 'post',
//     data: 'fullUserLogin',
//     success: function(fullUser){
//       console.log('post success')
//       window.location = '/dashboard'
//     }
//   })
// })




  }); // ends doc.ready
