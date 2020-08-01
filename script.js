$(document).ready(function() {

  // when search button is clicked, the user input is captured
  $("#search-button").on("click", function() {
    event.preventDefault();
    var city = $("#search-value").val();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + imperialUnits + apiKey;
    var apiKey = "&appid=09d177a650c7345f4f5eefa977756f24";
    var imperialUnits = "&units=imperial";

    if (city != '') {

      $.ajax({
        url: queryURL,
        type: 'GET',
        dataType: "json",
        success: function(data) {
          console.log(data);
        }

      });

    } else {
      $("#error").html('field cannot be empty');
    }

    city.val(' ');
  })

//     // clear input box on submit click
//     $("#search-value").val(" ");

//     // clear input box when clicked


    
//   });

//   searchWeather(searchValue);

//   $(".history").on("click", "li", function() {
//     searchWeather($(this).text());
//   });

//   function makeRow(text) {
//     //creates a list item and adds class names and text
//     var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
//     // appends the list item to the history unordered list
//     $(".history").append(li);
//   }

//   //global variabals for URL
 

//   function searchWeather(searchValue) {
//     $.ajax({
//       method: "GET",
//       url: queryURL,
//       dataType: "json",
//       success: function(data) {
//         // create history link for this search
//         if (history.indexOf(searchValue) === -1) {
//           history.push(searchValue);
//           window.localStorage.setItem("history", JSON.stringify(history));
    
//           makeRow(searchValue);
//            $("#today").empty();
//            $("#forecast").empty();

//         // create html content for current weather
//         var weatherDiv = $("<div class='weather-today'>");

//         var temp = $("<li>").text(data.main.temp);
//         weatherDiv.append(temp);

//         var humidity = $("<li>").text(data.main.humidity);
//         console.log('there is ' + humidity + ' % humidity');
        
      
//         // clear any old content
       
        
        

//         // merge and add to page
      

//         // call follow-up api endpoints
//         getForecast(searchValue);
//         getUVIndex(data.coord.lat, data.coord.lon);
//       }
//     }
//   })
  
//   function getForecast(searchValue) {
//     $.ajax({
//       type: "",
//       url: "" + searchValue + "",
//       dataType: "json",
//       success: function(data) {
//         // overwrite any existing content with title and empty row

//         // loop over all forecasts (by 3-hour increments)
//         for (var i = 0; i < data.list.length; i++) {
//           // only look at forecasts around 3:00pm
//           if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
//             // create html elements for a bootstrap card
            

//             // merge together and put on page
//           }
//         }
//       }
//     });
//   }

//   function getUVIndex(lat, lon) {
//     $.ajax({
//       type: "",
//       url: "" + lat + "&lon=" + lon,
//       dataType: "json",
//       success: function(data) {
//         var uv = $("<p>").text("UV Index: ");
//         var btn = $("<span>").addClass("btn btn-sm").text(data.value);
        
//         // change color depending on uv value
        
//         $("#today .card-body").append(uv.append(btn));
//       }
//     });
//   }

//   // get current history, if any
//   var history = JSON.parse(window.localStorage.getItem("history")) || [];

//   if (history.length > 0) {
//     searchWeather(history[history.length-1]);
//   }

//   for (var i = 0; i < history.length; i++) {
//     makeRow(history[i]);
//   }
// };