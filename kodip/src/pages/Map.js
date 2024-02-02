import React from  'react';
import BingMap from '../MapPage_Components/bingmap';
import SideBar from '../MapPage_Components/sidebar';
import SearchBar from './searchbar';


console.log('Map render')
const Map = ()=>{

  return (
    <div>
 <SearchBar/>
  <SideBar/>
  <BingMap/>

    </div>
  )
}
export default Map;