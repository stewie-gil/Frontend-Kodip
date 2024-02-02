import React, { useEffect, useState } from 'react';
import './contacts.css';


console.log('contacts render')
// Individual Contact Component
const ContactItem = ({ user, onClick, unreadCount, latestMessageSnippet }) => (
  <li onClick={() => onClick(user)}>
    <div className={`contact-item ${unreadCount > 0 ? 'has-unread' : ''}`}>
      <div className="contact-details">
        <img src={user.profilepic} alt={user.username} className="profile-pix" />
        <div className="info">
          <div className="name">
            <h4>{user.username}</h4>
            {unreadCount > 0 && <div className="notification-badge">{unreadCount}</div>}
          </div>
          {latestMessageSnippet && <p className="latest-message">{latestMessageSnippet}</p>}
        </div>
      </div>
    </div>
  </li>
);

function Contacts({ selectedUser, setSelectedUser, Online, setMessages, messages, readnotification }) {
  const [unreadMessages, setUnreadMessages] = useState([]);

 // console.log('messages on contact.js', messages)

  useEffect(() => {
    let newUnreadMessages = messages  
    .filter(message => message.status.read === false)
      .map(message => ({ message, userId: message.sender.senderId }));

      

    setUnreadMessages(newUnreadMessages);

   // console.log('when messages change', messages, 'what is in unreadmessages', newUnreadMessages )
  }, [messages]);

//console.log('all unread messages', unreadMessages, "all messages", messages)

  useEffect(() => {
    if (selectedUser) {
      setUnreadMessages(prevUnreadMessages =>
        prevUnreadMessages.map(message =>
          message.userId === selectedUser.userid ? { ...message, status: { received: true, read: true } } : message
        )
      );

      //console.log('unread messages after selected user', unreadMessages);

      // updatereplace the read messages in messages
      //maybe redundant. might want to get the updated list from the sever itself with various 
      setMessages( previousmessages => {
        return  previousmessages.map(prevMess => prevMess.sender.senderId === selectedUser.userid ? { ...prevMess, status: { received: true, read: true } } : prevMess )
    })


      // Communicate to the server that all unread messages from the selected user have been read
      const selectedUserMessages = unreadMessages.filter(message => message.userId === selectedUser.userid);

      selectedUserMessages.forEach(message => readnotification(message.message));

      // Update the unread count in the state
      setUnreadMessages(prevUnreadMessages => 
        prevUnreadMessages.filter(message => message.userId !== selectedUser.userid)
      );
      //console.log('unread messages after selected user and after updating', unreadMessages,'and now messages', messages);
    }
  }, [selectedUser]);

  const currentUserID = localStorage.userid;

  const getContactsWithUnreadMessages = () => {
    return Online.filter(user => user.userid !== currentUserID).map(user => {
      const userUnreadMessages = unreadMessages.filter(message => message.userId === user.userid);
      const unreadCount = userUnreadMessages.length;
      const latestMessage = userUnreadMessages[unreadCount - 1]?.message;

      const latestMessageSnippet = latestMessage ? `${latestMessage.message}` : null;

      return { ...user, unreadCount, latestMessageSnippet };
    });
  };

  const sortedContacts = getContactsWithUnreadMessages().sort((a, b) => (b.unreadCount ? 1 : 0) - (a.unreadCount ? 1 : 0));

  return (
< div className="entire-contacts">

<div className="search">

<div className="notifications">
Inbox  {unreadMessages.count > 0 && <div className="notification-badge">{unreadMessages.count}</div>}
</div>

<div >
        <input
          type="text"
          placeholder=" 🔍  Search..."
          className="search_contacts"
        />
</div>


</div>
    
    <div className="contacts">
      <div>
                        
        <ul id="contact-list">
          {sortedContacts.map(user => (
            <ContactItem
              key={user.email}
              user={user}
              onClick={setSelectedUser}
              unreadCount={user.unreadCount}
              latestMessageSnippet={user.latestMessageSnippet}
            />
          ))}
        </ul>
      </div>
    </div>
 </div>
  );
}

export default Contacts;
