import React, { useEffect, useState, useRef } from 'react';

import './chat.css';
import SendMessage from './sendMessage';



function Chats({selectedUser, selectMessages, newMessage, setNewMessage, handleclicksend}){
    
  const [messages, setMessages] = useState([]);
  //const [newMessage, setNewMessage] = useState('');

  useEffect(()=>{
setMessages(selectMessages);
//console.log('message changed xxxxxxx', selectMessages)

  }, [selectMessages])

  /*const handleSendMessage = () => {
    // Your logic to send the message goes here
    console.log('Sending message:', newMessage);
    // Clear the input after sending
    setNewMessage('');
  };

  const handleclicksend = (e) => {
    // Check if the Enter key is pressed
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior (e.g., newline in the input field)
      handleSendMessage(); // Call the function to send the message
    }
  };
*/


return (
  <div className="entire-container" >

    <div className="selected-User">  
  {selectedUser.username  ? (
    <h3>
      { <img src={selectedUser.profilepic} className="profile-pix" /> ||'None'} {selectedUser.username}</h3>
  ) : null}

    </div>

            <div className="chat-container">
              
           
              <div className="chat-messages">
                

                <div class='chatdiv' style={{paddingLeft:'20px', overflow:'auto'}}>
             
                 
                </div>
                
                
                {messages.map((message, index) => (
                  
                  <div key={index} className="message">
                    
                  {message.sender.senderId != localStorage.userid && 
                  
                  <div className= 'sender-message'> 
                  <img src={message.sender.profilepic} alt={message.sender.username} className="profile-pix" />
                  <div className='message'>{message.message}</div>
                              
                  <div className='timestamp'>{message.timestamp}</div>
                                         

                  </div>
                  }

                {message.sender.senderId === localStorage.userid && 
                  
                  <div className= 'user-message'> 
                    <img src={message.sender.profilepic} alt={message.sender.username} className="profile-pix" />
                  
                  <div className='message&timestamp'>

                  
                  <div className='message'>{message.message}</div>

                   <div className = 'timestamp-doubleticks'>                      
                  <div className='timestamp'>{message.timestamp}</div>
                  
                  
                  
                  <div className='doubleticks'>
                  
                  </div>
                  {message.status.read === true && <p className='blueticks'>✓✓ </p> }
                  {message.status.read === false && <p className= 'grayticks'>✓✓ </p> }
                  
                  </div>

                  </div>

                  </div>
                  }

                  
                    
                    
                  </div>
                ))}
                

           
              </div>

              <SendMessage setNewMessage={setNewMessage} newMessage={newMessage}  handleclicksend={handleclicksend}/>

              {/*
              <div className="message_input">
                <input
                className="chat-input"
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <button className="send-button" onClick={handleclicksend}>Send</button>
                
               </div>
                */}
               
            </div>



            </div>

)}

export default Chats;


