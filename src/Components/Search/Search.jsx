import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { geoApiOptions, GEO_API_URL } from '../../api';

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
      .then(response => response.json())
      .then(response => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          })
        }
      })
      .catch(err => console.error(err));
  }


  // const loadOptions = async (searchInputValue) => {
  //   try {
  //     const response = await fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${searchInputValue}`, geoApiOptions);
  //     const result = await response.json();

  //     return {
  //       options: result.data.map((city) => {
  //         return {
  //           value: `${city.latitude} ${city.longitude}`,
  //           label: `${city.name}, ${city.countryCode}`,
  //         };
  //       }),
  //     };
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  }

  return (
    <div className='search'>
      <AsyncPaginate
        placeholder='Search for City'
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  )
}

export default Search;