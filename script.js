$(document).ready(function () {
	// when search btn is clicked capture the value entered
	$("#search-button").on("click", function () {
		event.preventDefault();
		var searchValue = $("#search-value").val();
		// clear input box =after hitting search
		$("#search-value").val("");
		// clear input box when clicking inside box
		$("input:text").click(function () {
			$(this).val("");
			// clear today
			$("#today").empty();
			// clear 5-day
			$("#forecast").empty();
		});
		searchWeather(searchValue);
	
	});

	// history section

	// History
	$(".history").on("click", "li", function () {
		// runs the searchWeather function from before, using the value of the text inside the history list item
		searchWeather($(this).text());
	});

	// Search History List
	function makeRow(text) {
		// creates a new list item
		var li = $("<li>")
			// add class & class names
			.addClass("list-group-item list-group-item-action")
			// add text
			.text(text);
		// append to the history list
		$(".history").append(li);
	}

  // variables to make the url

	// &units=imperial is used in url for metric to imperial conversion
	var imperialUnits = "&units=imperial";
	// Weather API
	var apiOpenWeatherMap = "&appid=624cbb927ded664042da9cb2c49976f8";
	console.log("API:", apiOpenWeatherMap);

	// todays weather

	function searchWeather(searchValue) {
		$.ajax({
			type: "GET",
			url:
				"https://api.openweathermap.org/data/2.5/weather?q=" +
				searchValue +
				imperialUnits +
				apiOpenWeatherMap,
			dataType: "json",
			success: function (data) { // callback function for a successful API call 
				
				// create history link for this search
				if (history.indexOf(searchValue) === -1) {
					history.push(searchValue);
					window.localStorage.setItem("history", JSON.stringify(history)); // stores search value in local storage
					makeRow(searchValue); // makes a new row/li in the history section
				}
				// clear any old content
				$("#today").empty();
				$("#forecast").empty();

				// Time Conversion
		
				var sec = data.dt;
				var forecastdate = new Date(sec * 1000);
				var timestr = forecastdate.toLocaleTimeString();
				var datestr = forecastdate.toLocaleDateString();
				// Day of the week conversion
				var daystr = forecastdate.getUTCDay();
				var weekday = new Array(7);
				weekday[0] = "Sunday";
				weekday[1] = "Monday";
				weekday[2] = "Tuesday";
				weekday[3] = "Wednesday";
				weekday[4] = "Thursday";
				weekday[5] = "Friday";
				weekday[6] = "Saturday";
				var weekdaystr = weekday[daystr];

				// create html content for current weather
				var forecastUl = $("<div>", { id: "forecast-container" }); //creates a list to store the forecast in

				var liName = $("<div>", { id: "name-div" }); // creates list items for each set of data in the forecast
				liName.text(data.name);

				var liImg = $("<div>", { id: "img-div" }); //creates a div to store the image for each type of weather
      
        // create icon
				var iconImg = $("<img>");
				iconImg.attr(
					"src",
					"https://openweathermap.org/img/w/" + data.weather[0].icon + ".png", // selects the icon to match the weather
				);
				liImg.append(iconImg);

				var liTemp = $("<div>", { id: "temp-div" }); // creates a list item for temperature
				liTemp.text("Temperature: " + data.main.temp + " °F");

				var liHumidity = $("<div>", { id: "humid-div" }); // creates a list item for humidity
				liHumidity.text("Humidity: " + data.main.humidity + "%");

				var liWindSpeed = $("<div>", { id: "speed-div" }); // creates a list item for wind speed 
				liWindSpeed.text("Wind Speed: " + data.wind.speed + " MPH");

				var liUVIndex = $("<div>", { id: "index-div" }); // creates a list item for UV index 

				forecastUl.append(
					liName,
					liImg,
					liTemp,
					liHumidity,
					liWindSpeed,
					liUVIndex,
				);

				// merge and add to page
				$("#today").append(forecastUl); // adds the current forecast to the div with id "today"

				// call follow-up api endpoints
				getForecast(searchValue);
				console.log("getForecast:", searchValue);
				getUVIndex(data.coord.lat, data.coord.lon);
	
			},
			error: function (xhr, status, error) { // callback function if API call is unssuccessful
				alert(
					"Result: " +
						status +
						" " +
						error +
						" " +
						xhr.status +
						" " +
						xhr.statusText,
				);
			},
		});
	}

	// 5 day forecast section

	function getForecast(searchValue) {
		$.ajax({
			type: "GET",
			// https:api.openweathermap.org/data/2.5/forecast?q=[City]&units=imperial&appid=38f55767a0c60100721a848c0be8deb5
			url:
				"https://api.openweathermap.org/data/2.5/forecast?q=" +
				searchValue +
				imperialUnits +
				apiOpenWeatherMap,
			dataType: "json",
			success: function (data) { // callback function for successful API call
				// overwrite any existing content with title and empty row
				$("#forecast").empty();

				// create title "5-Day Forecast:"
				var fiveTitle = $("<div>", {
					id: "five-title",
				});
				fiveTitle.text("5-Day Forecast:");

				// Forecast card container
				var fiveContent = $("<div>", {
					class: "card-container",
					id: "five-content",
				});

				// loop over all forecasts (by 3-hour increments)
				
				// var i = 0 makes forecast start on current day
				for (var i = 0; i < data.list.length; i++) {
					// only look at forecasts around 3:00pm
					if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
						// create html elements for a bootstrap card
						var fiveCard = $("<div>", {
							class: "card",
							id: "five-card",
						});

						// Forecast Time Conversion
						var fivesec = data.list[i].dt;
						var fiveforecastdate = new Date(fivesec * 1000);
						var fivedatestr = fiveforecastdate.toLocaleDateString();
						// Day of the week conversion
						var fivedaystr = fiveforecastdate.getUTCDay();
						var fiveweekday = new Array(7);
						fiveweekday[0] = "Sunday";
						fiveweekday[1] = "Monday";
						fiveweekday[2] = "Tuesday";
						fiveweekday[3] = "Wednesday";
						fiveweekday[4] = "Thursday";
						fiveweekday[5] = "Friday";
						fiveweekday[6] = "Saturday";
						var fiveweekdaystr = fiveweekday[fivedaystr];

						// Date
						var fiveDay = $("<h4>", {
							class: "card-title",
							id: "five-day",
						});
						fiveDay.text(fiveweekdaystr);

						var fiveDate = $("<h5>", {
							class: "card-title",
							id: "five-date",
						});
						fiveDate.text(fivedatestr);

						// IMG Icon
						var fiveImg = $("<p>", {
							class: "card-body",
							id: "five-img",
						});
						// Render Icon
						var fiveIconImg = $("<img>");
						fiveIconImg.attr(
							"src",
							"https://openweathermap.org/img/w/" +
								data.list[i].weather[0].icon +
								".png",
						);
						fiveImg.append(fiveIconImg);

						// Temp
						var fiveTemp = $("<p>", {
							class: "card-body",
							id: "five-temp",
						});
						fiveTemp.text("Temperature: " + data.list[i].main.temp + " °F");

						//Humidity
						var fiveHumidity = $("<p>", {
							class: "card-body",
							id: "five-humid",
						});
						fiveHumidity.text("Humidity: " + data.list[i].main.humidity + "%");

						// appends the day, date, icon, temp, and humidity to the card
						fiveCard.append(
							fiveDay,
							fiveDate,
							fiveIconImg,
							fiveTemp,
							fiveHumidity,
						);

						// merge together and put on page
						$("#forecast .card-container").append(fiveCard);

						// render cards in container
						fiveContent.append(fiveCard);

					}
				}
				// Append Forecast Title and Container
				$("#forecast").append(fiveTitle, fiveContent);
			},
			error: function (xhr, status, error) { // callback function for unsuccessful call
				alert(
					"Result: " +
						status +
						" " +
						error +
						" " +
						xhr.status +
						" " +
						xhr.statusText,
				);
			},
		});
	}

	// UV Index

	function getUVIndex(lat, lon) {
		$.ajax({
			type: "GET",
			url:
				"https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
				lat +
				"&lon=" +
				lon +
				apiOpenWeatherMap,
			dataType: "json",
			success: function (data) {
				// Find UV Index
				var uv = data[0].value;
				// uv text to replace placeholder
				var uvText = $("<p>").text("UV Index: ");
				// Make UV btn
				var btn = $("<span>").addClass("btn btn-sm").text(data[0].value);
				console.log("UV:", uv);
				// change color depending on uv value
				if (uv > 0 && uv <= 2.99) {
					btn.addClass("low-uv");
					btn.css("color", "white");
					btn.css("background-color", "lightblue");
				} else if (uv >= 3 && uv <= 5.99) {
					btn.addClass("moderate-uv");
					btn.css("color", "white");
					btn.css("background-color", "green");
				} else if (uv >= 6 && uv <= 7.99) {
					btn.addClass("high-uv");
					btn.css("color", "white");
					btn.css("background-color", "orange");
				} else if (uv >= 8 && uv <= 10.99) {
					btn.addClass("vhigh-uv");
					btn.css("color", "white");
					btn.css("background-color", "red");
				} else {
					btn.addClass("extreme-uv");
					btn.css("color", "white");
					btn.css("background-color", "darkred");
				}
				// adds UV index to the div with id today and index-div
				$("#today #index-div").append(uvText.append(btn));
			},
			error: function (xhr, status, error) { //callback function for unsuccessful API call
				alert(
					"Result: " +
						status +
						" " +
						error +
						" " +
						xhr.status +
						" " +
						xhr.statusText,
				);
			},
		});
	}

	// get current history
	var history = JSON.parse(window.localStorage.getItem("history")) || []; // gets data from local storage and uses parse to change it back grom a string

	if (history.length > 0) {
		searchWeather(history[history.length - 1]);
	}

	for (var i = 0; i < history.length; i++) {
		makeRow(history[i]);
	}
});

// clears local storage and empties today and forecast divs

$("#clear-button").on("click", function () {
	console.clear();
	// clear
	localStorage.clear();
	// reload list
	window.location.reload();
});