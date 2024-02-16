
import React, { useRef, memo, createContext, useContext, useEffect, useState } from 'react';

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
    const [login ,setLogin] = useState(false)
    const [logout ,setLogout] = useState(false)
    
    const isFirstMount = useRef(true);
    const serverURL = 'http://localhost:3002';
    const socket = io(serverURL);



console.log('when socket provider loads login:', login)

useEffect(() => {
  socket.on('connect', () => {
    console.log('Socket.io connection established');
    console.log('How does our localstorage look like?',localStorage)

//Important: this is temporary, look into this later
// maybe check if the token is valid before logging in the user again. 
    if (login === true ) {
      setEmail(localStorage.email);
      setUserName(localStorage.username);
  
      const userobj = localStorage.userid;
      
     /* {
        email: localStorage.email,
        username: localStorage.username,
        userid: localStorage.userid,
        profilepic: localStorage.profilepic,
      };
  */
      socket.emit('user login', userobj);
      console.log("we'll trigger login");
  
    }
  });  
}, []);




useEffect(()=>{
//skip this on initial mount. only wait till login change

if(isFirstMount.current){
  isFirstMount.current = false;
  return;
}
  

  //trigger login event when the login token changes
  if (login) {
    setEmail(localStorage.email);
    setUserName(localStorage.username);

    const userobj = {
      email: localStorage.email,
      username: localStorage.username,
      userid: localStorage.userid,
      profilepic: localStorage.profilepic,
    };

    socket.emit('user login', userobj);
    console.log("we'll trigger login");
      } 
  
  if(!login){
    socket.emit('logout', localStorage.userid)
    console.log("we'll trigger logout", localStorage.userid );
    localStorage.setItem('token', '')
    localStorage.setItem('userid', '')
    }
    socket.on('online users', (users) => {
    setOnlineUsers(users);
   //console.log('online users recieved', users)
    });
    }, [login])


    //chat History
useEffect(()=>{
console.log('selected usre is this one', selectedUser)
socket.emit('askChatHistory', selectedUser.userid)

}, [selectedUser])

socket.on('getChatHistory', (history)=>{
  console.log('history from get chat',history)
})

  


    socket.on('chatHistory', (messages)=>{
setMessages([...messages])

    })



    // Handle receiving private messages from the server

  const privateMessageHandler = ({ sender, reciever, content, status, messageid }) => {
    console.log('Private message received:', sender, reciever, content);
    
    const newReceivedMessage = {
      sender,
      reciever,
      content,
      timestamp: new Date().toLocaleTimeString(),
      status,
      messageid,
    };
    setMessages((prevMessages) => [...prevMessages, newReceivedMessage]);
    console.log('Message received:', newReceivedMessage);

    const unreadmessagesbadge = {
      unread: 10, 
      senderId: newReceivedMessage.sender
    }

   //Letting the server know the message was received
    socket.emit('A new Message recieved', newReceivedMessage)
    console.log('Letting the server know the message was received sent a notification for New Message recieved', newReceivedMessage)
    
  };

  socket.on('A private message', privateMessageHandler);

  //return function will run during unmounting to clean up the listener.
  




//Handle notification for the messages we sent to a user
socket.on('Your message was recieved', (newReceivedMessage)=>{
  
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

      const sender = localStorage.userid
      

      
      const  reciever = userSelected.userid; // this needs to be passed in
      const  content = textMessage; // this needs to be passed in
      const messageid = uuidv4() //unique id for each message

      const status ={
        received:false,
        read: false
      } 
      

      socket.emit('private message', {reciever, content, sender, status, messageid });
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
    userfrompin ,SetUserFromPin,
    login, setLogin,
    logout, setLogout,
    sendMessage,
    readnotification
    }

    return (
    <SocketContext.Provider value = {values}>
    {children}
    </SocketContext.Provider>
    )

}



