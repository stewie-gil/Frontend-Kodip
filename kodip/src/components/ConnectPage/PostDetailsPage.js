import React from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCoins, faBed, faCar, faSwimmingPool } from '@fortawesome/free-solid-svg-icons';
import { ReactBingmaps } from 'react-bingmaps';
import './styles.css';

const PostDetailsPage = () => {
  const samplePosts = [
    { 
      id: 1,
      title: 'Looking for a house in Nairobi CBD',
      location: 'Nairobi CBD',
      amenities: ['2 bedrooms', 'Parking', 'Close to public transport'],
      additionalInfo: 'Looking for a furnished apartment within walking distance to work.',
      rewardsCoins: true,
      user: {
        id: 123,
        name: 'John Doe',
        profileImage: 'profile.jpg', // Path to user's profile image
        location: 'Nairobi, Kenya'
      },
      coordinates: [-1.286389, 36.817223] // Coordinates for Nairobi CBD (latitude, longitude)
    },
    // Add more sample posts as needed
  ];

  const { postId } = useParams();
  const post = samplePosts.find(post => post.id === parseInt(postId));

  return (
    <div className="post-details-container">
      <div className="post-details">
        <div className="post-header">
          <div className="user-profilex">
            <img src={post.user.profileImage} alt="User Profile" className="profile-image" />
            <div className="user-details">
              <h3>{post.user.name}</h3>
              <p>{post.user.location}</p>
            </div>
          </div>
          <div className="location-container">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
            <p className="location">{post.location}</p>
          </div>
        </div>
        <div className="post-body">
          <h2>{post.title}</h2>
          <div className="amenities">
            <p><FontAwesomeIcon icon={faBed} /> {post.amenities[0]}</p>
            <p><FontAwesomeIcon icon={faCar} /> {post.amenities[1]}</p>
            <p><FontAwesomeIcon icon={faSwimmingPool} /> {post.amenities[2]}</p>
          </div>
          <p className="additional-info">{post.additionalInfo}</p>
          {post.rewardsCoins && <p className="rewards"><FontAwesomeIcon icon={faCoins} /> Rewards Coins!</p>}
        </div>
        <hr />
        <div className="map-section">
          <h3>Location on the Map</h3>
          <ReactBingmaps
            bingmapKey="AimaoVvThYG5kUK8jG8Gya7X7Q1lHKXk54RztUw2UNUGJR9Bbkna4DDkYqOWeHjv"
            center={post.coordinates} // Set the center of the map to post coordinates
            zoom={15} // Set zoom level (adjust as needed)
            className="bing-mapx" // Add CSS class for styling
          >
            <ReactBingmaps.Pushpin
              key={post.id}
              location={post.coordinates} // Set the location of the pushpin to post coordinates
              draggable={false}
            />
          </ReactBingmaps>
        </div>
        <hr />
        <div className="comments-section">
          <h3>Comments</h3>
          <CommentList postId={postId} />
        </div>
        <hr />
        <div className="comment-form-section">
          <h3>Add a Comment</h3>
          <CommentForm postId={postId} />
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
