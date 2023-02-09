import { useState } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api/api";
import "./App.css";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Search from "./components/search/Search";
import Button from "./components/button/Button";
import Header from "./components/header/Header";

function App() {
  const [search, setSearch] = useState(null);
  const [showSearch, setShowSearch] = useState(true);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentWeatherData, setCurrentWeatherData] = useState([]);

  const handleOnSearchChange = searchData => {
    const [lat, lon] = searchData.value.split(" ");

    const weatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([weatherFetch])
      .then(async response => {
        const weatherResponse = await response[0].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Header />

      <Search
        search={search}
        setSearch={setSearch}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        onSearchChange={handleOnSearchChange}
      />
      <div className="container">
        <CurrentWeather
          data={currentWeather}
          currentWeatherData={currentWeatherData}
          setCurrentWeatherData={setCurrentWeatherData}
        />
      </div>

      <Button setShowSearch={setShowSearch} setSearch={setSearch} />
    </div>
  );
}

export default App;
