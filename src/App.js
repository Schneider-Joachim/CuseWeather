import './App.css';
// useEffect is a React command that...
import { useEffect } from 'react';

function Weather () {
  // need to use useEffect in order to make API calls in React
  useEffect(() => {
    const weatherAPICall = async () => {
      // this is the first APIcall response that shows you the lon and lat which you will need for the second APIcall
     const geocodingResponse = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=Syracuse,NY,US&limit=1&appid=c304dbadd4058e122a895a0dc39003bf"
     );
     const geocodingData = await geocodingResponse.json();
//  we need the lat and lon for the second api call because it will give weather data for your exact location
     const lat = geocodingData[0].lat;
     const lon = geocodingData[0].lon;
// this is the second APIcall response that shows the current weather data after inputing the lon and lat
// we used a template literal and string interpolation to input the lat and lon into the APIcall as variables
    const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c304dbadd4058e122a895a0dc39003bf&units=imperial`
    );
    const currentWeatherData = await currentWeatherResponse.json();
    console.log(currentWeatherData);
    // showing the current weather in Cuse'
    }; 
    weatherAPICall(); 
  }, []) // Placing an empty array will make the API call run once, which stops the API call from running too much.
  // APIcall section above
  // Weather app content below
  return (
    <div className="App">
      {/* In React, must change class to className*/}
    <div className="container">
            <div className="row">
                <div className="col-2 text-center" id="weatherIcon">
                 ☁️ 
                </div>
                <div className="col-2">
                    <div id="currentTemp">21</div>
                    {/*need to pass in objects in react, not strings*/}
                    <div><span style={{fontWeight:"bold"}}>℉</span> | ℃ </div>
                </div>
                <div className="col-2">
                    Precipitation: 0%
                    Humidity: 84%<br/>
                    Wind: 8mph
                </div>
                <div className="col-6 text-end">
                    <span style={{fontWeight:"bold"}}>Syracuse, NY 13210</span><br/>
                    Monday 3:21 PM<br/>
                    Partly Cloudy<br/>
                    H:70° | L:51° 
                </div>
            </div>
            {/* End of Row 1 */}
            <hr/>
            <div className="row" id="forecastRow">
{/*  <ForecastDay/> is created to call the functional component. it is put in a closing tag to call it  */}
            <ForecastDay  day="Mon" icon="☀️" temp="33"/>
            <ForecastDay  day="Tue" icon="🌧" temp="40"/>
            <ForecastDay  day="Wed" icon="🌧" temp="40"/>
            <ForecastDay  day="Thu" icon="🌨" temp={40}/>
            <ForecastDay  day="Fri" icon="❄️" temp={39}/>
            <ForecastDay  day="Sat" icon="☁️" temp={34}/>
            <ForecastDay  day="Sun" icon="⛅️" temp={39}/>
            </div>
                {/* End of row 2 */}
            </div>
    </div>
  );
}

// When creating your own component, use TitleCase/NameCase (names interchangable)
const ForecastDay = ({day, icon, temp}) => {
  //Need to pass the prop into the functions parameters in order for the browser to render it
  return (
    <div className="col text-center">
      {/* need to pass in the prop with curly braces {} */}
    <p>{day}</p>
    <p className="forecastIcon">{icon}</p>
    <p>{temp}</p>
  </div>
   // pulled these divs from the original weather app's line 31-35
  );

};


export default Weather;
