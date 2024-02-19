import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCoins } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <h2>{post.title}</h2>
        <p className="location">
          <FontAwesomeIcon icon={faMapMarkerAlt} /> {post.location}
        </p>
      </div>
      <div className="post-body">
        <p className="amenities">{post.amenities}</p>
        <p className="additional-info">{post.additionalInfo}</p>
      </div>
      <div className="post-footer">
        {post.rewardsCoins && (
          <p className="rewards">
            <FontAwesomeIcon icon={faCoins} /> Rewards Coins!
          </p>
        )}
        <Link to={`/posts/${post.id}`} className="view-details">View Details</Link>
      </div>
    </div>
  );
};

export default PostCard;
