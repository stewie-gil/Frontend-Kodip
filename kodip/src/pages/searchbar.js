import React, { useState } from 'react';
import './searchbar.css';
import useOnSearch from '../hooks/useSearch';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const {onSearch, setOnSearch} = useOnSearch()

  const handleSearch = () => {
    // Perform search based on the selected criteria
    const searchCriteria = {
      location,
      propertyType,
      priceRange,
    };

    // Pass the search criteria to the parent component or perform the search directly
    setOnSearch(searchCriteria);
  };

  return (
    <div className= 'EntireSearchBar'>
    <div className="desktop-search-bar">
      <input
        type="text"
        placeholder="Enter Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
        <option value="">Property Type</option>
        <option value="singleRoom">Single Room</option>
        <option value="studio">Studio</option>
        <option value="oneBedroom">One Bedroom</option>
        <option value="twoBedroom">Two Bedroom</option>
        
      </select>

      <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
        <option value="">Price Range</option>
        <option value="100-200">ksh0k - ksh10k</option>
        <option value="100-200">ksh10k - ksh20k</option>
        <option value="200-300">ksh20k - ksh30k</option>
        <option value="300-400">ksh30k - ksh40k</option>
        <option value="300-400">ksh40k plus</option>
        
      </select>

      <button onClick={handleSearch}>Search</button>
    </div>




    <div className="mobile-search-bar">
      
    <button className='search-icon' onClick={handleSearch}> <FontAwesomeIcon icon={faSearchLocation} />
        </button>

      <input
      
        type="text"
        placeholder="Enter Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      

      
    </div>
    </div>
  );
};

export default SearchBar;
