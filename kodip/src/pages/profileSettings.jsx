import React, { useState } from 'react';
import './ProfileForm.css'; // Import CSS file for styling

const ProfileForm = () => {
  // Sample user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phoneNumber: '123-456-7890',
    profilePic: '/default-profile-pic.png', // Default profile picture
  });

  // State variables for form fields
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [profilePic, setProfilePic] = useState(null); // For storing uploaded profile picture

  // Function to handle profile picture upload
  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    // You can implement file validation (e.g., file type, size) here if needed
    setProfilePic(URL.createObjectURL(file));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can update the user profile with the new data
    setUserData({
      ...userData,
      name,
      email,
      phoneNumber,
      profilePic: profilePic || userData.profilePic, // Use uploaded profile picture if available, otherwise keep the existing one
    });
    // You can also make an API call to update the user profile data on the server
    console.log('Profile updated:', userData);
  };

  return (
    <div className="profile-form-container">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="profilePic">Profile Picture:</label>
          <input type="file" id="profilePic" accept="image/*" onChange={handleProfilePicUpload} />
          {profilePic && <img src={profilePic} alt="Profile" className="profile-pic-preview" />}
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileForm;
