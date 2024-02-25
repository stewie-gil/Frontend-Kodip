import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faHome, faBuilding, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import './HouseTypeBar.css'; // Create HouseTypeBar.css file for styling

const HouseTypeBar = ({ onSelectHouseType }) => {
  // Array of house types with their corresponding FontAwesome icons
  const houseTypes = [
    { name: 'Studio', icon: faHome },
    { name: 'One Bedroom', icon: faBed },
    { name: 'Two Bedroom', icon: faBed },
    { name: 'Airbnb', icon: faBuilding },
    
    { name: 'Other', icon: faWarehouse }
  ];

  // State to keep track of the selected house type
  const [selectedHouseType, setSelectedHouseType] = useState(null);

  // Function to handle house type selection
  const handleHouseTypeSelect = (houseType) => {
    setSelectedHouseType(houseType);
    onSelectHouseType(houseType); // Pass selected house type to parent component
  };

  return (
    <div className="house-type-bar">
      {/* Render house type icons */}
      {houseTypes.map((houseType, index) => (
        <div
          key={index}
          className={`house-type-icon ${selectedHouseType === houseType.name ? 'selected' : ''}`}
          onClick={() => handleHouseTypeSelect(houseType.name)}
        >
          <FontAwesomeIcon icon={houseType.icon} />
          <span>{houseType.name}</span>
        </div>
      ))}
    </div>
  );
};

export default HouseTypeBar;
