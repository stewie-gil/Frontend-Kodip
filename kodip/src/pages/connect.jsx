import React, { useState } from 'react';
import './connect.css'; // Import CSS file for styling
import { ReactBingmaps } from 'react-bingmaps';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const Connect = () => {
  // State variables for form fields
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [priceRange, setPriceRange] = useState('');
  const [amenities, setAmenities] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [receiveOwnerContacts, setReceiveOwnerContacts] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here (e.g., send request to server)
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
      <div className='flex1'>
      <div className='heroText'>
      
      <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '10px' }}>
            <p style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>Struggling to find the perfect property?</p>
            <h2 style={{ fontSize: '55px', padding: '20px', color: '#058533' }}>Connect with a Local!</h2>
            <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.5' }}>Discover hidden gems in your desired area with the help of locals! </p>
            <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.5' }}>Our dedicated locals specialize in uncovering off-market properties, making your search effortless and efficient.</p>
            <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.5' }}>They'll go the extra mile by scouting your preferred neighborhood, contacting landlords, sharing exclusive photos and contact details, and assisting you throughout the entire process!</p>
            <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.5' }}>Gain invaluable insights and insider tips about your future home directly from those who know it best.</p>
            <p style={{ fontSize: '18px', padding:'14px', fontStyle:'italic', color: 'black', lineHeight: '1.5' }}> Its a seamless, fast and personalized property search journey!</p>
      </div>


      </div>

      


      <form onSubmit={handleSubmit}>
      

          <label htmlFor="selectedLocation">Select a Location:</label>
      
          
          
          <div className='map'>
   
          <ReactBingmaps
          bingmapKey={mapOptions.credentials}
        center={mapOptions.center}
          style={{ width: "200px", height: "300px" }}
            />
            </div>






        
        <div className="form-group">
          <label htmlFor="priceRange">Price Range:</label>
          <input type="text" id="priceRange" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="amenities">Amenities:</label>
          <input type="text" id="amenities" value={amenities} onChange={(e) => setAmenities(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="additionalInfo">Additional Info:</label>
          <textarea id="additionalInfo" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} />
        </div>
        
        Appreciate the local
        <div className="buyCoffee">
            
            <button style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', marginTop: '20px' }}>
            Buy a Coffee  - Ksh 100 (Selected)
                <FontAwesomeIcon icon={faCoffee} style={{ marginRight: '10px' }} />
                
            </button>

            
        </div>
        <p>Buying the local guides a coffee is a small gesture that goes a long way in showing
          
          <br/> appreciation for their hard work and dedication. It helps support
          
          <br/> them and shows gratitude for their assistance in finding your perfect property!</p>

        
        <button type="submit">Connect with a Local</button>
      </form>
      <p className="note"> 
      Note: Please note that while we strive to connect you with a local guide promptly, our service is currently in development, and as such, there may be a slight delay in matching you with a guide. 
     
      Rest assured, we are actively recruiting new local guides to join our team and enhance your experience.</p>
    </div>




    

 

    </div>



  );
};

export default Connect;








  


 