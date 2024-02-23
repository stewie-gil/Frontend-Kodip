import React, { useState, useRef, useEffect } from "react";
import { ReactBingmaps } from 'react-bingmaps';
import axios from 'axios';
import './mapfile.css';
import './bingmap.css';
import useOnSearch from "../../../hooks/useSearch";
import PropertyForm from "../../Listings/listproperty";

function MapComponent() {
  const [infoboxLocation, setInfoboxLocation] = useState(null);
  const [infoboxVisible, setInfoboxVisible] = useState(false);
  const [pushPins, setPushPins] = useState([]);
  const searchInputRef = useRef(null);
  const {onSearch, setOnSearch} = useOnSearch()
  const [clickLocation, setClickLocation] = useState(null); // Fix: useState should be a function
  const [postModal,setPostModal] = useState(false);

  const mapOptions = {
    center: [-1.164194, 36.945139],
    credentials: "AimaoVvThYG5kUK8jG8Gya7X7Q1lHKXk54RztUw2UNUGJR9Bbkna4DDkYqOWeHjv",
  };

  useEffect(() => {
    // Sample coordinates for places in Nairobi
    const latitudeNairobi1 = -1.286389;
    const longitudeNairobi1 = 36.817223;     
  }, []);

  const latitudeNairobi2 = -1.2921;
  const longitudeNairobi2 = 36.8219;

  // Static pushpin data with infobox for Nairobi
  const image = 'https://images.unsplash.com/photo-1623298317883-6b70254edf31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const pushpin = [
    {
      location: [latitudeNairobi2, longitudeNairobi2],
      addHandler: "click",
      infoboxOption: {
        title: "Kitengela Heights",
        description: `<div>
          <img src="${image}" alt="Image Alt Text" class='infoboximage' style="max-width: 100%; height: auto;" />
          <p>Message owners</p>
          <p>View photos</p>
        </div>`,
      },
      pushPinOption: { color: 'black', title: 'Nairobi Location 2' },
    }
  ];





  const handleMouseDown = (e) => {
    const latitude = e.latitude;
    const longitude = e.longitude;
  
    const holdTimer = setTimeout(() => {
      console.log('Hold click event triggered', { latitude, longitude });
      setClickLocation({ latitude, longitude });
      setPostModal(true)
    }, 1000); // Hold duration set to 2 seconds (2000 milliseconds)
  
    const handleMouseUp = () => {
      clearTimeout(holdTimer);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  const getLocation = {
    addHandler: 'mousedown',
    callback: handleMouseDown
  };




  useEffect(() => {
    // Update the center of the map when infoboxLocation changes
    if (infoboxLocation) {
      mapOptions.center = [infoboxLocation.latitude, infoboxLocation.longitude];
    }
  }, [infoboxLocation]);

  useEffect(() => {
    const handleSearch = async (onSearch) => {
      const searchQuery = onSearch.location;

      if (searchQuery.trim() !== "") {
        try {
          const response = await axios.get(
            `http://dev.virtualearth.net/REST/v1/Locations?q=${searchQuery}&key=${mapOptions.credentials}`
          );

          const locations = response.data.resourceSets[0]?.resources;

          if (locations && locations.length > 0) {
            const firstLocation = locations[0];
            const location = {
              latitude: firstLocation.point.coordinates[0],
              longitude: firstLocation.point.coordinates[1],
            };
            setInfoboxLocation(location);
            setInfoboxVisible(true);
          } else {
            alert("Location not found. Kindly check your spelling.");
          }
        } catch (error) {
          console.error("Error searching for location:", error);
        }
      } else {
        console.error("Please enter a valid search query.");
      }
    };

    if (onSearch.location) {
      handleSearch(onSearch);
    }
  }, [onSearch]);

  

  return (
    <div className='mapComponent'>
      <ReactBingmaps
        bingmapKey={mapOptions.credentials}
        center={infoboxLocation ? [infoboxLocation.latitude, infoboxLocation.longitude] : mapOptions.center}
        infoboxesWithPushPins={pushpin}
        style={{ width: "100%", height: "100%", position: 'absolute' }}
        
        getLocation={getLocation}
      />

{postModal && (
        <div className="post-property-modal">
         
            <span className="close-propertyform" onClick={() => setPostModal(false)}>&times;</span>
            <PropertyForm/>
        
        </div>
      )}
    </div>





  );
}

export default MapComponent;
