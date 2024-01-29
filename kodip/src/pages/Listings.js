import React from  'react';

import SearchBar from './searchbar';
import PropertyListings from './PropertyListings';
import SideBar from '../MapPage_Components/sidebar';

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