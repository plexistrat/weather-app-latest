import "./App.css";
import { useState } from "react";

const API_KEY = "40316b85d07adb9a1bb9e4a97d9c554f";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError("City not found");
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) =>
          setCity(
            e.target.value.length > 0
              ? e.target.value
              : alert("Please enter a city name")
          )
        }
      />
      <button onClick={getWeather}>Search</button>

      {error && <p>{error}</p>}

      {weather && (
        <div className="weather-box">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
}

export default App;
