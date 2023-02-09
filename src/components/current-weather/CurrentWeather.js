import { useEffect } from "react";

const CurrentWeather = ({
  data,
  setCurrentWeatherData,
  currentWeatherData,
}) => {
  const weatherID = currentWeatherData.map((item, index) => {
    return {
      ...item,
      id: index + 1,
    };
  });

  useEffect(() => {
    if (data !== null) {
      fetch(`https://restcountries.com/v3.1/alpha/${data.sys.country}`)
        .then(response => response.json())
        .then(response => {
          const flagFetch = response;
          setCurrentWeatherData([
            ...currentWeatherData,
            {
              id: weatherID.length + 1,
              city: data.city,
              country: data.sys.country,
              temp: data.main.temp,
              wind: data.wind.speed,
              img: `icons/${data.weather[0].icon}.png`,
              desc: data.weather[0].description,
              flag: flagFetch[0].flag,
              windDeg: data.wind.deg,
            },
          ]);
          if (currentWeatherData !== "") {
            localStorage.setItem(
              "currentWeather:",
              JSON.stringify([
                ...currentWeatherData,
                {
                  id: weatherID.length + 1,
                  city: data.city,
                  country: data.sys.country,
                  temp: data.main.temp,
                  wind: data.wind.speed,
                  img: `icons/${data.weather[0].icon}.png`,
                  desc: data.weather[0].description,
                  flag: flagFetch[0].flag,
                  windDeg: data.wind.deg,
                },
              ])
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    const storedWeather = localStorage.getItem("currentWeather:");
    if (storedWeather) {
      setCurrentWeatherData(JSON.parse(storedWeather));
    }
    // eslint-disable-next-line
  }, []);

  const handleDelete = index => {
    setCurrentWeatherData(currentWeatherData.filter((item, i) => i !== index));
    localStorage.setItem(
      "currentWeather:",
      JSON.stringify(currentWeatherData.filter((item, i) => i !== index))
    );
  };

  return (
    <>
      {currentWeatherData.map((weather, index) => {
        return (
          <div className="weather" key={index}>
            <div className="top">
              <div>
                <p className="city">{weather.city}</p>
                <p className="flag"> {weather.flag}</p>
                <p className="weather-description">{weather.desc}</p>
              </div>
              <img alt="weather" className="weather-icon" src={weather.img} />
            </div>
            <div className="bottom">
              <p className="temperature">{Math.round(weather.temp)}°C</p>
              <div className="details">
                <div className="parameter-row">
                  <span className="parameter-label">Wind</span>
                  <span className="parameter-value">{weather.wind} km/h</span>
                  <i
                    className="fas fa-arrow-up"
                    style={{ transform: `rotate(${weather.windDeg}deg)` }}
                  ></i>
                </div>
              </div>
            </div>

            <button
              className="button-remove"
              onClick={() => handleDelete(index)}
            >
              Remove
            </button>
          </div>
        );
      })}
    </>
  );
};

export default CurrentWeather;
