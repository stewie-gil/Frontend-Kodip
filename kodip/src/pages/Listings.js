import React from  'react';

import SearchBar from './searchbar';
import PropertyListings from '../components/Listings/PropertyListings';
import SideBar from '../components/MapPage_Components/sidebar/sidebar';

import HouseTypeBar from './HouseTypeBar';

const Listings = ()=>{

  return (
    <div >
    <HouseTypeBar/>
    <SideBar/>
    <PropertyListings/>

    </div>
  )
}
export default Listings;