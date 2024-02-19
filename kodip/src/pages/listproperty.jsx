import React, { useState } from 'react';
import './PropertyForm.css'; // Import CSS file for styling

const PropertyForm = () => {
  const [propertyType, setPropertyType] = useState('');
  const [price, setPrice] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [receiveInquiries, setReceiveInquiries] = useState(false);
  const [receiveAppInbox, setReceiveAppInbox] = useState(true);
  const [receiveMobileMessage, setReceiveMobileMessage] = useState(false);
  const [receiveWhatsapp, setReceiveWhatsapp] = useState(false);
  const [receiveEmail, setReceiveEmail] = useState(false);
  const [code, setCode] = useState('');
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [measurement, setMeasurement] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]); // For storing uploaded images

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, validation, sending OTP, etc.
    // For simplicity, let's just log the form data
    console.log({
      propertyType,
      price,
      phoneNumber,
      receiveInquiries,
      receiveAppInbox,
      receiveMobileMessage,
      receiveWhatsapp,
      receiveEmail,
      code,
      bedrooms,
      bathrooms,
      measurement,
      description,
      images
    });
    // Reset form fields after submission if needed
    resetForm();
  };

  const resetForm = () => {
    setPropertyType('');
    setPrice('');
    setPhoneNumber('');
    setReceiveInquiries(false);
    setReceiveAppInbox(true);
    setReceiveMobileMessage(false);
    setReceiveWhatsapp(false);
    setReceiveEmail(false);
    setCode('');
    setShowMoreDescription(false);
    setBedrooms('');
    setBathrooms('');
    setMeasurement('');
    setDescription('');
    setImages([]);
  };

  const handleVerifyClick = () => {
    // Here you can handle verification process
    // For simplicity, let's just set the state to true
    setCode('123456'); // Mock OTP for demonstration
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Store uploaded images in state
    setImages(files);
  };

  return (
    <div className="property-form-container">
      <h2>Add Property Listing</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="propertyType">Property Type:</label>
          <select id="propertyType" value={propertyType} onChange={(e) => setPropertyType(e.target.value)} required>
            <option value="">Select</option>
            <option value="Studio Apartment">Studio Apartment</option>
            <option value="1 Bedroom">1 Bedroom</option>
            {/* Add more options here */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
          <button type="button" className="verify-button" onClick={handleVerifyClick}>Verify</button>
        </div>
        {code && (
          <div className="form-group">
            <label htmlFor="code">Code:</label>
            <input type="text" id="code" value={code} readOnly />
          </div>
        )}
        <p className="note">We take security of personal data seriously. Your phone number will not be visible to others.</p>
        <div className="form-group">
          <label htmlFor="receiveInquiries">Receive Inquiries:</label>
          <div className="toggle-button">
            <input type="checkbox" id="receiveInquiries" checked={receiveInquiries} onChange={() => setReceiveInquiries(!receiveInquiries)} />
            <label htmlFor="receiveInquiries" className="toggle-label"></label>
          </div>
          <p className="note">You can always turn off inquiries when you want.</p>
        </div>
        {receiveInquiries && (
          <div className="inquiries-options">
            <div className="form-group">
              <label>Receive Inquiries On:</label>
              <div className="checkbox-group">
                <input type="checkbox" id="appInbox" checked={receiveAppInbox} onChange={() => setReceiveAppInbox(!receiveAppInbox)} />
                <label htmlFor="appInbox">App Inbox</label>
                <input type="checkbox" id="mobileMessage" checked={receiveMobileMessage} onChange={() => setReceiveMobileMessage(!receiveMobileMessage)} />
                <label htmlFor="mobileMessage">Mobile Message</label>
                <input type="checkbox" id="whatsapp" checked={receiveWhatsapp} onChange={() => setReceiveWhatsapp(!receiveWhatsapp)} />
                <label htmlFor="whatsapp">Whatsapp</label>
                <input type="checkbox" id="email" checked={receiveEmail} onChange={() => setReceiveEmail(!receiveEmail)} />
                <label htmlFor="email">Email</label>
              </div>
            </div>
          </div>
        )}
        <div className="toggle-more-description">
          <input type="checkbox" id="showMoreDescription" checked={showMoreDescription} onChange={() => setShowMoreDescription(!showMoreDescription)} />
          <label htmlFor="showMoreDescription">Add Photos and More Description</label>
        </div>
        {showMoreDescription && (
          <div className="more-description">
            <div className="form-group">
              <label htmlFor="propertyDescription">Description of the property:</label>
              <textarea id="propertyDescription" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="bedrooms">Bedrooms:</label>
              <input type="number" id="bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="bathrooms">Bathrooms:</label>
              <input type="number" id="bathrooms" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="measurement">Measurement (sq ft):</label>
              <input type="number" id="measurement" value={measurement} onChange={(e) => setMeasurement(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="images">Property Photos:</label>
              <input type="file" id="images" accept="image/*" onChange={handleImageUpload} multiple required />
            </div>
          </div>
        )}
        <button type="submit" className="add-photos-button">Add Property Photos</button>
      </form>
    </div>
  );
};

export default PropertyForm;
