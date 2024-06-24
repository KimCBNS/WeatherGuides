# 06 Server-Side APIs: Weather Dashboard

# Weather Dashboard

The link to my Github for the code: https://github.com/KimCBNS/WeatherGuides
The link to the deployed Github page: https://kimcbns.github.io/WeatherGuides/

## Description

This project is a weather dashboard web application for our UofT Full Stack Developer course. It provides a 5-day weather forecast for multiple cities. The dashboard features dynamically updated HTML and CSS, and it leverages third-party APIs to fetch and display weather data. This allows users to plan their trips by viewing current and future weather conditions for their chosen destinations.

## Technologies Used

- **HTML**: For structuring the web pages.
- **CSS**: For styling the web pages.
- **JavaScript**: For adding interactivity to the web pages.
- **Bootstrap**: For responsive design and layout.
- **jQuery**: For easier DOM manipulation and event handling.
- **Day.js**: For date and time manipulation.
- **OpenWeatherMap API**: For retrieving weather data.
- **LocalStorage**: For storing search history and persistent data.

## Features

### User Story

As a traveler, I want to see the weather outlook for multiple cities so that I can plan a trip accordingly.

### Acceptance Criteria

1. **Search for a City**
   - Users can search for a city using a form input.
   - Upon searching, the current weather and a 5-day forecast for the city are displayed.
   - The city is added to the search history.

2. **View Current Weather Conditions**
   - Displays the city name, date, an icon representing the weather conditions, temperature, humidity, and wind speed.

3. **View Future Weather Conditions**
   - Displays a 5-day forecast showing the date, an icon representing the weather conditions, temperature, wind speed, and humidity.

4. **Search History**
   - Users can click on a city in the search history to view its current and future weather conditions again.

## If you want to build your own:

1. **Register for an API Key**
   - Go to the [OpenWeatherMap API](https://openweathermap.org/api) and sign up for an API key.
   - Note: It may take up to 2 hours for the API key to activate.

2. **Retrieve Weather Data**
   - Use the 5 Day Weather Forecast API to get weather data for cities. The base URL is:
     ```
     https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
     ```
   - To get geographical coordinates from a city name, use the OpenWeatherMap Geocoding API.



## Usage

1. Enter a city name in the search input and click the search button.
2. The current weather conditions and a 5-day forecast for the city will be displayed.
3. The city will be added to the search history.
4. Click on any city in the search history to view its weather information again.

## Credits

- [OpenWeatherMap API](https://openweathermap.org/api)
- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [Day.js](https://day.js.org/)

## License

This project is licensed under the MIT License.

---
