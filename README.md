# 06 Server-Side APIs: Weather Dashboard

Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. Use `localStorage` to store any persistent data.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast



```

## Functionality 

When the user opens the site, they are prompted to enter the name of a city, in order to see the weather in that location
[landing page](img/landingpage.png)

When the user enters a city, the input value is taken and entered into the API call for the open weather map API. The response to that call is used to get retrieve specific data, like the temperature, the humidity, the wind speed, and the UV index. As well as the current weather info, the API call is used to show the user a 5 day forecast for that area. The temperatures shown in the 5 day forecast are the projected temperature at 3PM.

[forecast](img/forecast.png)

The weather data is stored in the browser's local storage and is easily accessed when the user clicks on the city's name in the search history section. Each time the user searches a new city, it is added to the search history in their browser, so they can cycle through multiple locations.

[new search](img/newsearch.png)
[history](img/history.png)

When the user no longer has a need for their old searches, they can click on the clear search history button, which removes the old weather data from the local storage and clears the results from the user's screen

[clear](img/clear.png)

## links
[Live application](https://ghudson46.github.io/weather-forecast)
[github repo](https://github.com/ghudson46/weather-forecast)

