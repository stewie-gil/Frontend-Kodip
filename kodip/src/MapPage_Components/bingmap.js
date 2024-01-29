import React, { useState } from "react";
import { ReactBingmaps } from 'react-bingmaps';
import axios, { all } from 'axios';
import './mapfile.css';



function MapComponent(prop) {
  const [infoboxLocation, setInfoboxLocation] = useState(null);
  const [infoboxVisible, setInfoboxVisible] = useState(false);
  const [pushPins, setPushPins] = useState([]);
  const [getemail, setGetEmail] = useState();

  const mapOptions = {
    center: [-1.164194, 36.945139],
    credentials: "AimaoVvThYG5kUK8jG8Gya7X7Q1lHKXk54RztUw2UNUGJR9Bbkna4DDkYqOWeHjv",
  };



  return (
    <div className= 'mapComponent'>
     

      <ReactBingmaps
        bingmapKey="AimaoVvThYG5kUK8jG8Gya7X7Q1lHKXk54RztUw2UNUGJR9Bbkna4DDkYqOWeHjv"
        center={mapOptions.center}
        infoboxesWithPushPins = {pushPins}
        style={{ width: "100%", height: "100%", position: 'absolute' }}
      />

    
       
  

    </div>
  );
}

export default MapComponent;
