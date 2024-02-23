import React from  'react';

import SearchBar from './searchbar';
import PropertyListings from '../components/Listings/PropertyListings';
import SideBar from '../components/MapPage_Components/sidebar/sidebar';

const Listings = ()=>{

  return (
    <div >
    <SearchBar/>
    <SideBar/>
    <PropertyListings/>

    </div>
  )
}
export default Listings;