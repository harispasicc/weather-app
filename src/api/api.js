export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "99047c8cb7msh0a92fbf595a8a93p1869a5jsn2e4037ce8f7e",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const GEP_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "a1b25f7bd4ea1e877b22d1104a33e60b";
fetch(`${GEP_API_URL}/cities`, geoApiOptions)
  .then(response => response.json())
  .catch(err => console.error(err));
