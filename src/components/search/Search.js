import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEP_API_URL, geoApiOptions } from "../../api/api";

function Search({
  onSearchChange,
  search,
  setSearch,
  showSearch,
  setShowSearch,
}) {
  const loadOptions = inputValue => {
    let cityData = fetch(
      `${GEP_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then(response => response.json())
      .then(response => {
        return {
          options: response.data.map(city => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name},${city.countryCode}`,
            };
          }),
        };
      })
      .catch(err => console.error(err));
    return cityData;
  };

  const handleOnChange = searchData => {
    setSearch(searchData);
    onSearchChange(searchData);
    setShowSearch(true);
  };

  return (
    <div hidden={showSearch}>
      <AsyncPaginate
        className="search-input"
        placeholder="Search for the city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  );
}

export default Search;
