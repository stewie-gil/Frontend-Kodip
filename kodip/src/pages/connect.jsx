import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './connect.css'; // Import CSS file for styling
import { ReactBingmaps } from 'react-bingmaps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCoffee } from '@fortawesome/free-solid-svg-icons';

const Connect = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [priceRange, setPriceRange] = useState('');
  const [amenities, setAmenities] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [receiveOwnerContacts, setReceiveOwnerContacts] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log('Selected Location:', selectedLocation);
    console.log('Price Range:', priceRange);
    console.log('Amenities:', amenities);
    console.log('Additional Info:', additionalInfo);
    console.log('Receive Owner Contacts:', receiveOwnerContacts);
  };

  const mapOptions = {
    center: [-1.164194, 36.945139],
    credentials: "AimaoVvThYG5kUK8jG8Gya7X7Q1lHKXk54RztUw2UNUGJR9Bbkna4DDkYqOWeHjv",
  };

  return (
    <div className="connectPage">
      <div className="connectFormContainer">
        <div className="connectForm">
          <h1>Discover Hidden Gems with Locals</h1>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="selectedLocation">Location:</label>

              <div className="mapContainer" >
          <ReactBingmaps bingmapKey={mapOptions.credentials} center={mapOptions.center}  />
        </div>
              <div className="locationInput">
                <input type="text" id="selectedLocation" placeholder="Enter your location" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} />
                <FontAwesomeIcon icon={faMapMarkerAlt} className="locationIcon" />
              </div>
            </div>
            <div className="formGroup">
              <label htmlFor="priceRange">Price Range:</label>
              <input type="text" id="priceRange" placeholder="Enter your price range" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} />
            </div>
            <div className="formGroup">
              <label htmlFor="amenities">Amenities:</label>
              <input type="text" id="amenities" placeholder="Enter desired amenities" value={amenities} onChange={(e) => setAmenities(e.target.value)} />
            </div>
            <div className="formGroup">
              <label htmlFor="additionalInfo">Additional Info:</label>
              <textarea id="additionalInfo" placeholder="Enter any additional information" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} />
            </div>
            <div className="formGroup">
              

              <div className="appreciationSection">
        <h2>Appreciate the Local</h2>
        <div className="buyCoffee">
          <button className="coffeeButton">
            <FontAwesomeIcon icon={faCoffee} className="coffeeIcon" />
            Buy a Coffee - Ksh 100 (Selected)
          </button>
        </div>
        <p>Buying the local guides a coffee is a small gesture that goes a long way in showing appreciation for their hard work and dedication. It helps support them and shows gratitude for their assistance in finding your perfect property!</p>
      </div>

            </div>
            <Link to="/connectpage" ><button type="submit" className="connectButton">Create Post</button>
           
      </Link>
          </form>
        </div >
      
        

        <div style={{ fontFamily: 'Arial, sans-serif', width: "40%",textAlign: 'center', padding: '10px' }}>
          <p style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>Struggling to find the perfect property?</p>
          <h3 style={{ fontSize: '55px', padding: '40px', color: '#058533' }}>Connect with Locals!</h3>
          <p style={{ fontSize: '18px', padding: '10px',color: '#555', lineHeight: '1.5' }}>Discover hidden gems in your desired area with the help of locals! </p>
          <p style={{ fontSize: '18px', padding: '10px',color: '#555', lineHeight: '1.5' }}>Our dedicated locals specialize in uncovering off-market properties, making your search effortless and efficient.</p>
          <p style={{ fontSize: '18px', padding: '10px',color: '#555', lineHeight: '1.5' }}>They'll go the extra mile by scouting your preferred neighborhood, contacting landlords, sharing exclusive photos and contact details, and assisting you throughout the entire process!</p>
          <p style={{ fontSize: '18px', padding: '10px',color: '#555', lineHeight: '1.5' }}>Gain invaluable insights and insider tips about your future home directly from those who know it best.</p>
          <p style={{ fontSize: '18px',padding: '14px', padding: '14px', fontStyle: 'italic', color: 'black', lineHeight: '1.5' }}> Its a seamless, fast and personalized property search journey!</p>
        </div>









      </div>

      <p className="note">Note: Please note that while we strive to connect you with a local guide promptly, our service is currently in development, and as such, there may be a slight delay in matching you with a guide. Rest assured, we are actively recruiting new local guides to join our team and enhance your experience.</p>
    </div>
  );
};

export default Connect;
