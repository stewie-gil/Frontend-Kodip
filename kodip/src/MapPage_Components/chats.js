import React, { useEffect, useState } from 'react';
import './chat.css';
import SendMessage from './sendMessage';



function Chats({ selectedUser, selectMessages, newMessage, setNewMessage, handleclicksend, Online }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(selectMessages);
  }, [selectMessages]);

  return (
    <div className="entire-container">
      <div className="selected-User">
        {selectedUser.username ? (
          <h3>
            {selectedUser.profilepic && <img src={selectedUser.profilepic} className="profile-pix" alt="Profile" />}
            {selectedUser.username}
          </h3>
        ) : null}
      </div>

      <div className="chat-container">
        <div className="chat-messages">
          <div className='chatdiv' style={{ paddingLeft: '20px', overflow: 'auto' }}></div>

          {messages.map((message, index) => (
            <div key={index} className="message">
              {Online.map((user) => {
                
                if (message.sender !== localStorage.userid && user.userid === message.sender) {
                 
                  return (
                    <div className='sender-message' key={user._id}>
                      <img src={user.profilepic} alt={user.username} className="profile-pix" />
                      <div className='message'>{message.content}</div>
                      <div className='timestamp'>{message.timestamp}</div>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          ))}

          {messages.map((message, index) => (
            <div key={index} className="message">
              {message.sender === localStorage.userid && (
                <div className='user-message'>
                  <img src={localStorage.profilepic} alt={message.sender.username} className="profile-pix" />
                  <div className='message&timestamp'>
                    <div className='message'>{message.content}</div>
                    <div className='timestamp-doubleticks'>
                      <div className='timestamp'>{message.timestamp}</div>
                      <div className='doubleticks'></div>
                      {message.status.read === true && <p className='blueticks'>✓✓ </p>}
                      {message.status.read === false && <p className='grayticks'>✓✓ </p>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <SendMessage setNewMessage={setNewMessage} newMessage={newMessage} handleclicksend={handleclicksend} />
      </div>
    </div>
  );
}

export default Chats;
