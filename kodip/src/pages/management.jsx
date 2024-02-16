import React, { useState } from 'react';
import './PropertyManagementPage.css'; // Import CSS file for styling

const PropertyManagementPage = () => {
  // Sample property data
  const [properties, setProperties] = useState([
    {
      id: 1,
      location: '123 Main St, City, State',
      propertyType: 'Apartment',
      price: '$1000/month',
      receiveInquiries: ['App Inbox', 'Mobile Message'],
      pictures: ['/property-image1.jpg', '/property-image2.jpg'],
      description: 'This is a beautiful apartment located in the heart of the city.',
      bedrooms: 2,
      bathrooms: 1,
    },
    // Add more properties here
  ]);

  // State to track edited property fields
  const [editedProperties, setEditedProperties] = useState({});

  // Function to handle editing a property field
  const handleEditField = (propertyId, fieldName, value) => {
    setEditedProperties(prevState => ({
      ...prevState,
      [propertyId]: {
        ...prevState[propertyId],
        [fieldName]: value,
      },
    }));
  };

  // Function to handle updating property information
  const handleUpdateProperty = (propertyId) => {
    // Implement updating functionality here
    // For simplicity, just log the updated property data
    const updatedProperty = {
      ...properties.find(property => property.id === propertyId),
      ...editedProperties[propertyId],
    };
    console.log('Updated property:', updatedProperty);
    // Update the properties state with the updated property data
    setProperties(prevState =>
      prevState.map(property =>
        property.id === propertyId ? updatedProperty : property
      )
    );
    // Clear edited state for the updated property
    setEditedProperties(prevState => {
      const { [propertyId]: deletedProperty, ...rest } = prevState;
      return rest;
    });
  };

  return (
    <div className="property-management-page">
      <h2>Manage Your Properties</h2>
      {properties.map(property => (
        <div className="property-card" key={property.id}>
          <div className="property-info">
            <div className="property-field">
              <label htmlFor={`location_${property.id}`}>Location:</label>
              <input
                type="text"
                id={`location_${property.id}`}
                value={editedProperties[property.id]?.location || property.location}
                onChange={(e) => handleEditField(property.id, 'location', e.target.value)}
              />
            </div>
            <div className="property-field">
              <label htmlFor={`propertyType_${property.id}`}>Property Type:</label>
              <input
                type="text"
                id={`propertyType_${property.id}`}
                value={editedProperties[property.id]?.propertyType || property.propertyType}
                onChange={(e) => handleEditField(property.id, 'propertyType', e.target.value)}
              />
            </div>
            {/* Add similar input fields for other property fields */}
          </div>
          <div className="property-actions">
            <button onClick={() => handleUpdateProperty(property.id)}>Update</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyManagementPage;
