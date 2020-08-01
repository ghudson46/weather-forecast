$(document).ready(function() {

  var searchValue = $("#search-value").val();
  //  SEARCH BAR

  // when search button is clicked, the user input is captured
  $("#search-button").on("click", function() {
    event.preventDefault();
    var searchValue = $("#search-value").val();
    // clears search box after submitted
    $("#search-value").val('');
    //clear input when clicking inside box
    $("input:text").click(function() {
      $(this).val('');
      // clears todays forecast
      $("#today").empty();
      // clears 5 day forecast
      $("#forecast").empty();
    });
    searchWeather(searchValue);
  
  });

  //  HISTORY SECTION

  // history
  $(".history").on("click", "li", function() {
    searchWeather($(this).text());
  });

  // creates history list
  function makeRow(text) {
    // creates a list with class list-group-item and action and adds the parameter text
    var li =$("<li>").addClass("list-group-item list-group-item-action").text(text);
    // append to history section
    $(".history").append(li);
  }

  // creates weather URL
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + imperialUnits + apiKey;

  // my personal API key for open weather API
  var apiKey = "&appid=624cbb927ded664042da9cb2c49976f8";

  // gives you the data from API in farenheit and not kelvin or celcius
  var imperialUnits = "&units=imperial";

  //  TODAY'S WEATHER
  function searchWeather(searchValue) {
    $.ajax({
      url: queryURL,
      type: 'GET',
      dataType: 'json'
    }).then(function (response) {
      console.log(response);
      // create history link for this particular search
      if (history.indexOf(searchValue) === -1) {
        history.pushState(searchValue);
        window.localStorage.setItem("history", JSON.stringify(history));
        makeRow(searchValue);
      }
      // clear old content
      $("#today").empty();
      $("#forecast").empty();

      // time conversion 
      var sec = data.dt;
      var date = new Date(sec * 1000);
      var timeStr = date.toLocaleTimeString();
      var dateStr = date.toLocaleTimeString();
      // convert day of the week
      var dayStr = date.getUTCDay();
      var weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Suturday";
      var weekdayStr = weekday[dayStr];

      // add current weather data into HTML
      var forecastList = $("<div>").attr("id", "forecast-container");
      var liName = $("<div>").attr("id", "name-div");
      liName.text(data.name + " (" + dateStr + ") ");

      var liImg = $("div").attr("id", "img-div");
      var icon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
      liImg.append(icon);

      var liTemp = $("<div>").attr("id", "temp-div");
      liTemp.text("Temperature: " + data.main.temp + " °F");

      var liTemp = $("<div>").attr("id", "temp-div");
      liTemp.text("Temperature: " + data.main.temp + " °F");

      var liTemp = $("<div>").attr("id", "temp-div");
      liTemp.text("Temperature: " + data.main.temp + " °F");
      
      var liUVIndex = $("<div>").attr("id", "index-div");

      forecastList.append(liName, liImg, liTemp, liHumidity, liWindSpeed, liUVIndex);
    })
  }

});
 