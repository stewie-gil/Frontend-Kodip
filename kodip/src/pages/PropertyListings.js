import React, { useState, useEffect } from 'react';
import './PropertyListing.css';
import Modal from 'react-modal';
import Imageapp from './Imageapp';


function PropertyListing({ listings }) {
  // State variables for managing selected image and its details
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagePropertyName, setSelectedImagePropertyName] = useState('');
  const [selectedImagePropertyType, setSelectedImagePropertyType] = useState('');
  const [selectedImagePropertyPrice, setSelectedImagePropertyPrice] = useState('');
  const [selectedImagePropertyContact, setSelectedImagePropertyContact] = useState('');
  const [selectedImagePropertyUrl, setSelectedImagePropertyUrl] = useState('');
  const [selectedImagePropertyAmenities, setselectedImagePropertyAmenities] = useState('');

  const position = [51.505, -0.09];

  const openModal = (image) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    // Update the selected image details when the selectedImage state changes
    if (selectedImage) {
      setSelectedImagePropertyName(selectedImage.propertyName);
      setSelectedImagePropertyType(selectedImage.propertyType);
      setSelectedImagePropertyContact(selectedImage.contactInfo);
      setSelectedImagePropertyUrl(selectedImage.imageUrls);
      setSelectedImagePropertyPrice(selectedImage.Price);
      setselectedImagePropertyAmenities(selectedImage.amenities);
      setSelectedImagePropertyContact(selectedImage.contactInfo);
    }
  }, [selectedImage]);

  const closeModal = () => {
    setSelectedImage(null);
  };


  const propertylistings = [
    {
      propertyType: 'House',
      price: 250000,
      description: 'Spacious family home with a beautiful garden.',
      propertyName: 'Sunset Villa',
      location: 'City A',
      amenities: ['Swimming pool', 'Garden', 'Garage'],
      contactInfo: ['John Doe', '123-456-7890'],
      imageUrls: [
        'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1600'
      ]
    },
    {
      propertyType: 'Apartment',
      price: 150000,
      description: 'Modern apartment in a prime location.',
      propertyName: 'City View Apartments',
      location: 'City B',
      amenities: ['Gym', 'Security', 'Parking'],
      contactInfo: ['Jane Smith', '987-654-3210'],
      imageUrls: [
        'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1600'
      ]
    },
    {
      propertyType: 'Villa',
      price: 500000,
      description: 'Luxurious villa with stunning views.',
      propertyName: 'Mountain Oasis',
      location: 'City C',
      amenities: ['Jacuzzi', 'Terrace', 'Private garden'],
      contactInfo: ['Alice Johnson', '555-123-4567'],
      imageUrls: [
        'https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg?auto=compress&cs=tinysrgb&w=1600'
      ]
    },
    {
      propertyType: 'Condo',
      price: 300000,
      description: 'Elegant condo with panoramic city views.',
      propertyName: 'Skyline Heights',
      location: 'City D',
      amenities: ['Concierge', 'Roof deck', 'Fitness center'],
      contactInfo: ['Bob Williams', '111-222-3333'],
      imageUrls: [
        'https://images.pexels.com/photos/2816284/pexels-photo-2816284.jpeg?auto=compress&cs=tinysrgb&w=1600'
      ]
    } ,
    {
      propertyType: 'Condo',
      price: 300000,
      description: 'Elegant condo with panoramic city views.',
      propertyName: 'Skyline Heights',
      location: 'City D',
      amenities: ['Concierge', 'Roof deck', 'Fitness center'],
      contactInfo: ['Bob Williams', '111-222-3333'],
      imageUrls: [
        'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fGhvbWV8ZW58MHx8MHx8fDA%3D'
      ]
    },
    {
        propertyType: 'House',
        price: 250000,
        description: 'Spacious family home with a beautiful garden.',
        propertyName: 'Sunset Villa',
        location: 'City A',
        amenities: ['Swimming pool', 'Garden', 'Garage'],
        contactInfo: ['John Doe', '123-456-7890'],
        imageUrls: [
          'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1600'
        ]
      },
      {
        propertyType: 'Apartment',
        price: 150000,
        description: 'Modern apartment in a prime location.',
        propertyName: 'City View Apartments',
        location: 'City B',
        amenities: ['Gym', 'Security', 'Parking'],
        contactInfo: ['Jane Smith', '987-654-3210'],
        imageUrls: [
          'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1600'
        ]
      },
      {
        propertyType: 'Villa',
        price: 500000,
        description: 'Luxurious villa with stunning views.',
        propertyName: 'Mountain Oasis',
        location: 'City C',
        amenities: ['Jacuzzi', 'Terrace', 'Private garden'],
        contactInfo: ['Alice Johnson', '555-123-4567'],
        imageUrls: [
          'https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg?auto=compress&cs=tinysrgb&w=1600'
        ]
      },
      {
        propertyType: 'Condo',
        price: 300000,
        description: 'Elegant condo with panoramic city views.',
        propertyName: 'Skyline Heights',
        location: 'City D',
        amenities: ['Concierge', 'Roof deck', 'Fitness center'],
        contactInfo: ['Bob Williams', '111-222-3333'],
        imageUrls: [
          'https://images.pexels.com/photos/2816284/pexels-photo-2816284.jpeg?auto=compress&cs=tinysrgb&w=1600'
        ]
      } ,
      {
        propertyType: 'Condo',
        price: 300000,
        description: 'Elegant condo with panoramic city views.',
        propertyName: 'Skyline Heights',
        location: 'City D',
        amenities: ['Concierge', 'Roof deck', 'Fitness center'],
        contactInfo: ['Bob Williams', '111-222-3333'],
        imageUrls: [
          'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fGhvbWV8ZW58MHx8MHx8fDA%3D'
        ]
      },
      {
        propertyType: 'House',
        price: 250000,
        description: 'Spacious family home with a beautiful garden.',
        propertyName: 'Sunset Villa',
        location: 'City A',
        amenities: ['Swimming pool', 'Garden', 'Garage'],
        contactInfo: ['John Doe', '123-456-7890'],
        imageUrls: [
          'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1600'
        ]
      },
      {
        propertyType: 'Apartment',
        price: 150000,
        description: 'Modern apartment in a prime location.',
        propertyName: 'City View Apartments',
        location: 'City B',
        amenities: ['Gym', 'Security', 'Parking'],
        contactInfo: ['Jane Smith', '987-654-3210'],
        imageUrls: [
          'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1600'
        ]
      },
      {
        propertyType: 'Villa',
        price: 500000,
        description: 'Luxurious villa with stunning views.',
        propertyName: 'Mountain Oasis',
        location: 'City C',
        amenities: ['Jacuzzi', 'Terrace', 'Private garden'],
        contactInfo: ['Alice Johnson', '555-123-4567'],
        imageUrls: [
          'https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg?auto=compress&cs=tinysrgb&w=1600'
        ]
      },
      {
        propertyType: 'Condo',
        price: 300000,
        description: 'Elegant condo with panoramic city views.',
        propertyName: 'Skyline Heights',
        location: 'City D',
        amenities: ['Concierge', 'Roof deck', 'Fitness center'],
        contactInfo: ['Bob Williams', '111-222-3333'],
        imageUrls: [
          'https://images.pexels.com/photos/2816284/pexels-photo-2816284.jpeg?auto=compress&cs=tinysrgb&w=1600'
        ]
      } ,
      {
        propertyType: 'Condo',
        price: 300000,
        description: 'Elegant condo with panoramic city views.',
        propertyName: 'Skyline Heights',
        location: 'City D',
        amenities: ['Concierge', 'Roof deck', 'Fitness center'],
        contactInfo: ['Bob Williams', '111-222-3333'],
        imageUrls: [
          'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fGhvbWV8ZW58MHx8MHx8fDA%3D'
        ]
      }
  ];




  return (
    <div className='PropertyListingCss'>
        
      {/* Render the property listings */}
      {propertylistings.map((listing) => (
        <div key={listing.id} className='listingCard'>

          {
            //console.log("image urls look like this", listing.imageUrls[0])
          }
          <img
            src={listing.imageUrls[0]}
            alt={listing.title}
            className='listingImage'
            onClick={() => openModal(listing)}
          />
          <div className='listingImagedescription'>
            <p>{listing.propertyName}</p>
            
            <div className='listingImagedescriptioncity'>
              <p>{listing.location}</p>
              <p>ksh {listing.price}</p>
            </div>
          </div>
        </div>
      ))}

      <Modal
        isOpen={selectedImage !== null}
        onRequestClose={closeModal}
        contentLabel="image Modal"
        className='Modal'
      >
        {selectedImage && (
          <div className='popup'>
            <div className='Modalheader'>
              <p className='Modalheadertitle'>{selectedImagePropertyName}</p>
              <img className='UserImage' src={selectedImagePropertyUrl} />
              <button className='closeselected' onClick= {closeModal}> close </button>
            </div>

            <Imageapp selected = {selectedImagePropertyUrl} />


            {/* <div className={styles.Modalimages}>
              <img src={selectedImagePropertyUrl} alt={selectedImage.title} className={styles.imagepop1} />
              <div className={styles.imagepopgroup}>
                <img src={selectedImagePropertyUrl} alt={selectedImage.title} className={styles.imagepop2} />
                <img src={selectedImagePropertyUrl} alt={selectedImage.title} className={styles.imagepop2} />
              </div>
            </div>
             */}
            <div className='ModalDescription'>
              <div className='ModalDescriptionbox'>
                <h3 className='description'>Description</h3>
                <p>{selectedImage.description}</p>
                <h3>Amenities</h3>
                {/* Render selected image's amenities */}
                <p>{selectedImagePropertyAmenities[0]}</p>
                <p>{selectedImagePropertyAmenities[1]}</p>
                <p>{selectedImagePropertyAmenities[2]}</p>
                <p>{selectedImagePropertyAmenities[3]}</p>
                <p>{selectedImagePropertyAmenities[4]}</p>
                <p>{selectedImagePropertyAmenities[5]}</p>
                <h3>Price</h3>
                <p>${selectedImage.price}</p>
              </div>
              <div className='ModalMap'>
                <p>Map</p>
                {/* MapContainer and related components are currently commented out */}
              </div>
            </div>
            <div className='ModalDescriptioncontact'>
              <h3>Contact</h3>
              {/* Render selected image's contact information */}
              <p>Phone Number: {selectedImagePropertyContact[0]}</p>
              <p>Email: {selectedImagePropertyContact[1]}</p>
            </div>
            <div className='ModalUsercomments'>
              <h3>More features coming :) </h3>
             
            </div>
          </div>
        )}
      </Modal>
   
    </div>
  );
}

export default PropertyListing;
