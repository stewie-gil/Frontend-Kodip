import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faLaugh, faSadTear, faAngry } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const CommentList = ({ postId, currentUser }) => {
  const sampleComments = [
    { id: 1, postId: 1, text: 'Great location! I know a few apartments nearby.', user: 'John Doe', timestamp: '2 hours ago', reactions: { like: 10, love: 5, laugh: 3, sad: 1, angry: 2 }, userId: 1 },
    { id: 2, postId: 1, text: 'I can help you find a furnished apartment in Nairobi CBD.', user: 'Jane Smith', timestamp: '1 hour ago', reactions: { like: 7, love: 8, laugh: 2, sad: 0, angry: 1 }, userId: 2 },
    { id: 3, postId: 2, text: 'I live in Kisumu and can provide insights on available rentals.', user: 'Alex Johnson', timestamp: '30 minutes ago', reactions: { like: 15, love: 3, laugh: 1, sad: 0, angry: 0 }, userId: 3 }
    // Add more sample comments as needed
  ];

  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState([]);
  const [reactionCounts, setReactionCounts] = useState({});

  const comments = sampleComments.filter(comment => comment.postId === parseInt(postId));

  const handleReply = (commentId) => {
    setReplyTo(commentId);
    setReplyText('');
  };

  const handleEdit = () => {
    
  };

  
  const handleDelete = () => {
    
  };

  const handleSubmitReply = () => {
    if (replyText.trim() !== '') {
      setReplies([...replies, { commentId: replyTo, text: replyText }]);
      setReplyText('');
      setReplyTo(null);
    }
  };

  const handleReaction = (commentId, reactionType) => {
    // Update the reaction count
    const updatedCounts = { ...reactionCounts };
    if (!updatedCounts[commentId]) {
      updatedCounts[commentId] = {};
    }
    updatedCounts[commentId][reactionType] = (updatedCounts[commentId][reactionType] || 0) + 1;
    setReactionCounts(updatedCounts);
  };

  const renderReactions = (commentId) => {
    return (
      <div className="reactions">
        <button className="reaction-button" onClick={() => handleReaction(commentId, 'like')}>
          <FontAwesomeIcon icon={faHeart} />
          {reactionCounts[commentId]?.like || 0}
        </button>
        <button className="reaction-button" onClick={() => handleReaction(commentId, 'love')}>
          <FontAwesomeIcon icon={faLaugh} />
          {reactionCounts[commentId]?.love || 0}
        </button>
        <button className="reaction-button" onClick={() => handleReaction(commentId, 'laugh')}>
          <FontAwesomeIcon icon={faSadTear} />
          {reactionCounts[commentId]?.laugh || 0}
        </button>
        <button className="reaction-button" onClick={() => handleReaction(commentId, 'sad')}>
          <FontAwesomeIcon icon={faAngry} />
          {reactionCounts[commentId]?.sad || 0}
        </button>
      </div>
    );
  };

  return (
    <div className="comment-list">
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <div className="comment-header">
            <div className="user-avatar"></div>
            <div className="comment-info">
              <p className="user-name">{comment.user}</p>
              <p className="timestamp">{comment.timestamp}</p>
            </div>
          </div>
          <p className="comment-text">{comment.text}</p>
          {renderReactions(comment.id)}
          <div className="comment-actions">
            {currentUser && currentUser.id === comment.userId && (
              <>
                <button className="edit-button" onClick={() => handleEdit(comment.id)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDelete(comment.id)}>
                  Delete
                </button>
              </>
            )}
            <button className="reply-button" onClick={() => handleReply(comment.id)}>
              Reply
            </button>
          </div>
          {replyTo === comment.id && (
            <div className="comment">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply..."
                className="reply-textarea"
              />
              <button onClick={handleSubmitReply} className="submit-reply-button">Submit</button>
            </div>
          )}
          {/* Display replies to this comment */}
          <div className="replies">
            {replies.map((reply, index) => (
              reply.commentId === comment.id && <div key={index} className="comment">
                <div className="comment-header">
                  <div className="user-avatar"></div>
                  <div className="comment-info">
                    <p className="user-name">{comment.user}</p>
                    {/* Display timestamp for replies if needed */}
                  </div>
                </div>
                <p className="comment-text">{reply.text}</p>
                {renderReactions(reply.commentId)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
