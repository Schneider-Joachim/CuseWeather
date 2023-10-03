import "./App.css";
import { useEffect, useState } from "react";
import format from "date-fns/format";

function Weather() {
  // this state shows current weather data
  const [weatherData, setWeatherData] = useState();

  // this state updates the rest of the week(the forecast)
  const [forecastData, setForecastData] = useState([
    { day: "Mon", icon: "🌧", temp: "40" },
    { day: "Tue", icon: "🌧", temp: "40" },
    { day: "Wed", icon: "🌨", temp: "40" },
    { day: "Thurs", icon: "❄️", temp: "39" },
    { day: "Fri", icon: "☁️", temp: "34" },
    { day: "Sat", icon: "☁️", temp: "34" },
    { day: "Sun", icon: "☁️", temp: "34" },
  ]);

  // need to use useEffect in order to make API calls in React
  useEffect(() => {
    const weatherAPICall = async () => {
      // the first APIcall response that shows the lon and lat which is needed for the second APIcall
      const geocodingResponse = await fetch(
        "https://api.openweathermap.org/geo/1.0/direct?q=Syracuse,NY,US&limit=1&appid=c304dbadd4058e122a895a0dc39003bf"
      );
      const geocodingData = await geocodingResponse.json();
      //   need the lat and lon for the second api call because it will give weather data for your exact location
      const lat = geocodingData[0].lat;
      const lon = geocodingData[0].lon;

      // the second APIcall response that shows current weather data after inputing the lon & lat
      const currentWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c304dbadd4058e122a895a0dc39003bf&units=imperial`
      );
      const currentWeatherData = await currentWeatherResponse.json();

      // showing the current weather data in Cuse' through this useState function
      const forecastResponse = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast/?lat=43.0481221&lon=-76.1474244&appid=c304dbadd4058e122a895a0dc39003bf&units=imperial&cnt=40"
      );
      const forecastedInfo = await forecastResponse.json();

      setWeatherData({
        // key: value
        temp: Math.floor(currentWeatherData.main.temp),
        humidity: currentWeatherData.main.humidity,
        windSpeed: Math.floor(currentWeatherData.wind.speed),
        weatherDescription: currentWeatherData.weather[0].main,
        tempHigh: Math.floor(currentWeatherData.main.temp_max),
        tempMin: Math.floor(currentWeatherData.main.temp_min),
        iconLogo: currentWeatherData.weather[0].icon,
        theCity: currentWeatherData.name,
        feelsLike: Math.floor(currentWeatherData.main.feels_like),
        cusePopulation: forecastedInfo.city.population,
      });

      // array of days
      const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
      setForecastData([
        {
          day: days[new Date(forecastedInfo.list[8].dt_txt).getDay()],
          temp: Math.floor(forecastedInfo.list[0].main.temp),
          icon: forecastedInfo.list[0].weather[0].icon,
        },
        {
          day: days[new Date(forecastedInfo.list[16].dt_txt).getDay()],
          temp: Math.floor(forecastedInfo.list[8].main.temp),
          icon: forecastedInfo.list[8].weather[0].icon,
        },
        {
          day: days[new Date(forecastedInfo.list[24].dt_txt).getDay()],
          temp: Math.floor(forecastedInfo.list[16].main.temp),
          icon: forecastedInfo.list[16].weather[0].icon,
        },
        {
          day: days[new Date(forecastedInfo.list[32].dt_txt).getDay()],
          temp: Math.floor(forecastedInfo.list[24].main.temp),
          icon: forecastedInfo.list[24].weather[0].icon,
        },
        {
          day: days[new Date(forecastedInfo.list[39].dt_txt).getDay()],
          temp: Math.floor(forecastedInfo.list[32].main.temp),
          icon: forecastedInfo.list[32].weather[0].icon,
        },
      ]);
    };
    weatherAPICall();
  }, []); // Placing an empty array will make the API call run once, which stops the API call from running too much.

  // this acts similar to a script deference on page load. If the weather data doesnt get recieved on page load, "gimme a sec" will show until the data loads
  if (!weatherData) {
    return <div>Gimme a sec...</div>;
  }

  // Weather app content below
  return (
    <div className="App">
      {/* In React, must change class to className*/}
      <div className="container">
        <div className="row">
          <div className="col-2 text-center" id="weatherIcon">
            <img
              id="currentWeatherIcon"
              src={`https://openweathermap.org/img/wn/${weatherData.iconLogo}@2x.png`}
            />
          </div>
          <div className="col-2">
            <div id="currentTemp">{weatherData.temp}°</div>
            <p>
              Feels like:{" "}
              <span style={{ fontWeight: "bold" }}>
                {weatherData.feelsLike}°
              </span>
            </p>
            <div>
              <span style={{ fontWeight: "bold" }}>℉</span> | ℃{" "}
            </div>
          </div>
          <div className="col-2">
            <p>Humidity: {weatherData.humidity}%</p>
            <p>Wind: {weatherData.windSpeed}mph</p>
            <span style={{ fontWeight: "bold" }}>H: </span>
            {weatherData.tempHigh}°|
            <span style={{ fontWeight: "bold" }}>L: </span>
            {weatherData.tempMin}°
          </div>
          <div className="col-6 text-end">
            <p>
              <span style={{ fontWeight: "bold" }}>
                {weatherData.theCity}, NY
              </span>
            </p>
            <p>Population: {weatherData.cusePopulation}</p>
            <p>
              <CuseTime />
            </p>
            {weatherData.weatherDescription}
          </div>
        </div>
        {/* End of Row 1 */}
        <hr />
        <div className="row" id="forecastRow">
          {forecastData.map((dayInfo) => {
            return (
              <ForecastDay
                day={dayInfo.day}
                icon={dayInfo.icon}
                temp={dayInfo.temp}
              />
            );
          })}
        </div>{" "}
        {/* End of row 2 */}
      </div>
    </div>
  );
}

// Component for days of the week icons
const ForecastDay = ({ day, icon, temp }) => {
  return (
    <div className="col text-center">
      <p>{day}</p>
      <p className="forecastIcon">
        <img
          id="currentWeatherIcon"
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        />
      </p>
      <p>{temp}</p>
    </div>
  );
};

// SOURCE: https://date-fns.org/v2.29.3/docs/parse
// New component for the time, date etc
const CuseTime = () => {
  return format(new Date(), "PPPP, K:mm  aa");
};

export default Weather;
