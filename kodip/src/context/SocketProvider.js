import React, { createContext, useContext, useEffect, useState } from 'react';

import io from 'socket.io-client';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const SocketContext = createContext();


export const SocketProvider = ({children}) =>{
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');
    const [sentMessage, setSentMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isMessageModalOpen, setMessageModalOpen] = useState(false);
    const [userfrompin ,SetUserFromPin] = useState([])
    

    const serverURL = 'http://localhost:3002';
    const socket = io(serverURL);



   



//console.log(localStorage)
useEffect(() => {
    // Handle connecting to the server and receiving online users
    //connect event is automatically emited by the client when it connects to a server.
    socket.on('connect', () => {
      console.log('Socket.io connection established');
//

      //we will want to check if user is authenticated later on

if(localStorage.userid){
  //console.log('doing a get', localStorage.userid)
setEmail(localStorage.email)
setUserName(localStorage.username)

const userobj = {
  email: localStorage.email,
  username: localStorage.username,
  userid: localStorage.userid,
  profilepic: localStorage.profilepic
}

//setUsers([...users, userobj]);
//sends the current user to the server to include them as part of the loggedin users
socket.emit('user login', userobj);
//console.log("user object", userobj)


}
      //
    });

    // recieve a list of all the online online  users 
    socket.on('online users', (users) => {
      console.log("online users received", users);
      setOnlineUsers(users);
    });
  }, []);


//send the users details to the server if the user changes login credentials
useEffect(()=>{

  if(localStorage.userid){
    //console.log('doing a get', localStorage.userid)
  setEmail(localStorage.email)
  setUserName(localStorage.username)
 
  const userobj = {
    email: localStorage.email,
    username: localStorage.username,
    userid: localStorage.userid,
    profilepic: localStorage.profilepic
  }
  

//setUsers([...users, userobj]);
//sends the current user to the server to include them as part of the loggedin users
socket.emit('user login', userobj);
//console.log("user object", userobj)
  

}

}, [localStorage.userid]);



  // Handle receiving private messages from the server
  //listening in on messages being sent
  // ...

// Handle receiving private messages from the server

useEffect(() => {
  console.log('Setting up private message listener');

  const privateMessageHandler = ({ sender, reciever, message, status, messageid }) => {
    //console.log('Private message received:', sender, reciever, message);
    
    const newReceivedMessage = {
      sender,
      reciever,
      message,
      timestamp: new Date().toLocaleTimeString(),
      status,
      messageid,
    };
    setMessages((prevMessages) => [...prevMessages, newReceivedMessage]);
    console.log('Message received:', newReceivedMessage);

    // when a user recieves a new message we send back the confirmation to server that it was recieved by the user
    // To do: implement notification badge on the contact and elsewhere as needed.
    

    // note the one who sent the message to us and put the badge on top of their name
    const unreadmessagesbadge = {
      unread: 10, 
      senderId: newReceivedMessage.sender.senderId
    }

   // Letting the server know the message was received
    socket.emit('A new Message recieved', newReceivedMessage)
    //console.log('Letting the server know the message was received sent a notification for New Message recieved', newReceivedMessage)
    
  };

  socket.on('A private message', privateMessageHandler);

  //return function will run during unmounting to clean up the listener.
  return () => {
    console.log('Cleaning up private message listener');
    socket.off('A private message', privateMessageHandler);
  };


}, []);

//Handle notification for the messages we sent to a user
socket.on('Your message was recieved', (newReceivedMessage)=>{
  
  /*
   newReceivedMessage = {
    sender,
    reciever,
    message,
    timestamp: new Date().toLocaleTimeString(),
    messageid,
    status : {
      recieved: true,
      read: false
    }
  };
  */
  //To do: implement double grey ticks on the message on chat component
  //console.log('Your message was recieved, will do double grey ticks here', newReceivedMessage)

    

    setMessages(previousMessages=>{
return  previousMessages.map(message=>{
   
   if(newReceivedMessage.messageid === message.messageid){
    
    return {...message, status: { recieved: true, read: false}}
   } 
   return message;
  })
})

})



// once the message is read we call a function to send out the acknowledgement that it was read
function readnotification(readmessageobj){
  socket.emit('We read your message', readmessageobj)
  console.log('sending notification to sever that the message was read');

  //To do: clear notifications badge on the user.
}


// now set up double ticks on your messages
socket.on('Your message was read', (readmessageobj)=>{

//To do: set up double ticks
//console.log('we will set up double ticks now for this message', readmessageobj)

setMessages(previousMessages=>{
  return  previousMessages.map(message=>{
     
     if(readmessageobj.messageid === message.messageid){
      
      return {...message, status: { recieved: true, read: true}}
     } 
     return message;
    })
  })

}); 




const sendMessage = (userSelected, textMessage) => {
  //console.log('called send message with', userSelected, textMessage);
//first have a selected user
    if (userSelected) {

      const sender = {
      senderUserName: localStorage.username, // we'll get this from local storage
      senderEmail: localStorage.email, // we'll get this from local storage. 
      senderId:localStorage.userid,
      profilepic: localStorage.profilepic
      }

      
      const  reciever = userSelected; // this needs to be passed in
      const  message = textMessage; // this needs to be passed in
      const messageid = uuidv4() //unique id for each message

      const status ={
        received:false,
        read: false
      } 
      

      socket.emit('private message', {reciever, message, sender, status, messageid });
      //console.log('reciever, message , sender', reciever, message, sender, status)
     
      setSentMessage(newMessage);

      setNewMessage('');
    }
  
 };


//handling when a user clicks
  function selectingUser (user, email) {
    setChatHistory('');
    SetUserFromPin(user.data.userobj);
    
    console.log("selecting user how many times called? ", user.data.userobj);
  }


//takes in a bool : true or false for openieng or closing message modal and a pins email
const messmodalfunction = async (bool, pinId) =>{
  console.log('messdmodal function email and bool', pinId, bool);
  if (pinId) {
  const user = await axios.post('http://localhost:3002/api/auth/usersobjfromid', {id: pinId})
  
  console.log('what is pin userobj', user, bool);
  setMessageModalOpen(bool)
  const emaill = user.email
  
  setSelectedUser(user.data.userobj)
 
//we need to use the usersemail to identify the user object and call the onclick function while passing it
//so that we simulate when a user selects a particular user

//
selectingUser(user, email);
console.log('how many time is messmodalfunction getting called/running', user.data.userobj, email);

}
}

// Handling Notifications 









const values = {
    messages, setMessages,
    newMessage, setNewMessage,
    userName, setUserName,
    users, setUsers,
    selectedUser, setSelectedUser,
    onlineUsers, setOnlineUsers,
    email, setEmail,
    password, setPassword,
    sentMessage, setSentMessage,
    chatHistory, setChatHistory,
    isMessageModalOpen, setMessageModalOpen,
    userfrompin ,SetUserFromPin
    

    }

    return (
    <SocketContext.Provider value = {values}>
    {children}
    </SocketContext.Provider>
    )

}