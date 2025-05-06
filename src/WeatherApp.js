import { useState, useEffect } from "react";
const styles = `
/* WeatherApp.css */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
}

/* Weather container with different backgrounds */
.weather-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem 1rem;
}

/* Background styles */
.default-bg {
  background: linear-gradient(to right, #4facfe, #00f2fe);
}

.clear-bg {
  background: linear-gradient(to right, #f6d365, #fda085);
}

.cloudy-bg {
  background: linear-gradient(to right, #bdc3c7, #2c3e50);
}

.rainy-bg {
  background: linear-gradient(to right, #3a7bd5, #3a6073);
}

.snow-bg {
  background: linear-gradient(to right, #e6e9f0, #eef1f5);
  color: #333;
}

.thunder-bg {
  background: linear-gradient(to right, #4b6cb7, #182848);
}

.mist-bg {
  background: linear-gradient(to right, #606c88, #3f4c6b);
}

/* Main card */
.weather-card {
  width: 100%;
  max-width: 480px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-top: 2rem;
}

/* App title */
.app-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

/* Search box */
.search-box {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #4facfe;
  box-shadow: 0 0 0 2px rgba(79, 172, 254, 0.3);
}

.search-button {
  padding: 0.75rem 1rem;
  background-color: #4facfe;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #3a8cf7;
}

.search-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* Error message */
.error-message {
  background-color: #ffeded;
  border-left: 4px solid #ff5252;
  color: #d32f2f;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
}

/* Recent searches */
.recent-searches {
  margin-bottom: 1.5rem;
}

.recent-title {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.search-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.search-tag {
  background-color: #eee;
  color: #555;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-tag:hover {
  background-color: #ddd;
}

/* Unit toggle */
.unit-toggle {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.unit-button {
  background-color: #eee;
  color: #555;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.unit-button:hover {
  background-color: #ddd;
}

/* Weather display */
.weather-display {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
}

/* City header */
.city-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.city-name {
  font-size: 1.75rem;
  font-weight: bold;
  color: #333;
}

.country-code {
  background-color: #eee;
  color: #555;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-left: 0.5rem;
}

/* Weather icon */
.weather-icon {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.weather-icon img {
  width: 128px;
  height: 128px;
}

/* Temperature info */
.temperature-box {
  margin-top: 0.5rem;
}

.temperature {
  font-size: 3rem;
  font-weight: bold;
  color: #333;
}

.weather-description {
  font-size: 1.25rem;
  color: #666;
  margin-top: 0.25rem;
  text-transform: capitalize;
}

/* Weather details */
.weather-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
}

.detail-item {
  background-color: #f8f8f8;
  padding: 0.75rem;
  border-radius: 8px;
}

.detail-label {
  font-size: 0.85rem;
  color: #888;
}

.detail-value {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .weather-card {
    padding: 1rem;
  }
  
  .app-title {
    font-size: 1.75rem;
  }
  
  .search-box {
    flex-direction: column;
  }
  
  .weather-details {
    grid-template-columns: 1fr;
  }
  
  .temperature {
    font-size: 2.5rem;
  }
}
`;

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("metric"); // metric or imperial
  const [recentSearches, setRecentSearches] = useState([]);

  // API key would typically be stored in environment variables
  const API_KEY = "40316b85d07adb9a1bb9e4a97d9c554f";

  useEffect(() => {
    // Load recent searches from localStorage on component mount
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const saveSearch = (cityName) => {
    const updatedSearches = [
      cityName,
      ...recentSearches.filter((item) => item !== cityName),
    ].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const getWeather = async (e) => {
    if (e) e.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
      );

      const data = await response.json();

      if (data.cod && data.cod !== 200) {
        setError(data.message || "City not found");
        setWeather(null);
      } else {
        setWeather(data);
        saveSearch(data.name);
      }
    } catch (error) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchFromHistory = (cityName) => {
    setCity(cityName);
    setTimeout(() => {
      getWeather();
    }, 10);
  };

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
    if (weather) {
      // Refetch weather with new unit
      setTimeout(() => getWeather(), 10);
    }
  };

  // Weather condition backgrounds
  const getWeatherClass = () => {
    if (!weather) return "default-bg";

    const condition = weather.weather[0].main.toLowerCase();
    const id = weather.weather[0].id;

    if (condition.includes("clear")) return "clear-bg";
    if (condition.includes("cloud")) return "cloudy-bg";
    if (condition.includes("rain") || (id >= 500 && id < 600))
      return "rainy-bg";
    if (condition.includes("snow") || (id >= 600 && id < 700)) return "snow-bg";
    if (condition.includes("thunder") || (id >= 200 && id < 300))
      return "thunder-bg";
    if (
      condition.includes("mist") ||
      condition.includes("fog") ||
      (id >= 700 && id < 800)
    )
      return "mist-bg";

    return "default-bg";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getWeather(e);
    }
  };

  useEffect(() => {
    // Inject the CSS
    const styleElement = document.createElement("style");
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);

    // Cleanup when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className={`weather-container ${getWeatherClass()}`}>
      <div className="weather-card">
        <h1 className="app-title">Weather Forecast</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input"
          />
          <button
            onClick={getWeather}
            className="search-button"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {recentSearches.length > 0 && (
          <div className="recent-searches">
            <h3 className="recent-title">Recent searches:</h3>
            <div className="search-tags">
              {recentSearches.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSearchFromHistory(item)}
                  className="search-tag"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="unit-toggle">
          <button onClick={toggleUnit} className="unit-button">
            {unit === "metric" ? "Switch to °F" : "Switch to °C"}
          </button>
        </div>

        {weather && (
          <div className="weather-display">
            <div className="city-header">
              <h2 className="city-name">{weather.name}</h2>
              {weather.sys && weather.sys.country && (
                <span className="country-code">{weather.sys.country}</span>
              )}
            </div>

            <div className="weather-icon">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt={weather.weather[0].description}
              />
            </div>

            <div className="temperature-box">
              <h3 className="temperature">
                {Math.round(weather.main.temp)}°{unit === "metric" ? "C" : "F"}
              </h3>
              <p className="weather-description">
                {weather.weather[0].description}
              </p>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <p className="detail-label">Feels Like</p>
                <p className="detail-value">
                  {Math.round(weather.main.feels_like)}°
                  {unit === "metric" ? "C" : "F"}
                </p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Humidity</p>
                <p className="detail-value">{weather.main.humidity}%</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Wind</p>
                <p className="detail-value">
                  {Math.round(weather.wind.speed)}{" "}
                  {unit === "metric" ? "m/s" : "mph"}
                </p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Pressure</p>
                <p className="detail-value">{weather.main.pressure} hPa</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
