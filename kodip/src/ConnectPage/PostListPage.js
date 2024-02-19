import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import PostCard from './PostCard';
import './styles.css';

const samplePosts = [
  {
    id: 1,
    title: 'Looking for a house in Nairobi CBD',
    location: 'Nairobi CBD',
    amenities: '2 bedrooms, parking, close to public transport',
    additionalInfo: 'Looking for a furnished apartment within walking distance to work.',
    rewardsCoins: true
  },
  {
    id: 2,
    title: 'Searching for a rental in Kisumu',
    location: 'Kisumu',
    amenities: '3 bedrooms, gated community, swimming pool',
    additionalInfo: 'Budget is flexible. Preferably near schools and hospitals.',
    rewardsCoins: false
  }
  // Add more sample posts as needed
];

const PostListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = samplePosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="post-list-container">
      <h1>Local Connect</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <FontAwesomeIcon
          icon={faTimes}
          className="clear-button"
          onClick={() => setSearchTerm('')}
        />
      </div>
      <div className="post-list">
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Link to="/connect" className="add-post-button">
        <FontAwesomeIcon icon={faPlus} />
        <span>Add Post</span>
      </Link>
    </div>
  );
};

export default PostListPage;
