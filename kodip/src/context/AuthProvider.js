import React, { useState, useEffect, useContext, createContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import { useSocketContext } from '../hooks/useSocketContext.js';

export const AuthContext = createContext()


export const AuthProvider = ({children}) => {

    const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username1, setUserName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [loginerror, setloginerror] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

const { login, setLogin, setLogout } = useSocketContext()

/**
 * Set up cookies and mananage the auth token with cookies
 * 
 */

/** manage loged in states even during reloads.
 * This is temporary. we will use cookies to track and manage the token 
 * and ensure it is still valid before setting the login variable to true.
 */
if (localStorage.token !== '' ){
 console.log('done checking', login);
  setLogin(true);
} else{
  setLogin(false);
  console.log('done checking 2', login);
}


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
     
    // send request to API to create a users jwt token 
    const loginData ={
      email: email,
      password: password,
      
      };
    
      axios.post('http://localhost:3002/api/user/login', loginData)
      .then((response) =>{
            
      const {username, token, userid, profilepic} = response.data;
     
      localStorage.setItem('userid', userid);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('profilepic', profilepic);
      localStorage.setItem('token', token);

      setUserName(username)
      // will check if token is invalid later etc...
      console.log('Logged In');
      setLogin(true); // socket IO provider context for indicating you've logged in
      
      setName(name);
      setModalOpen(false); // Close the modal after successful login

      })
      .catch((error)=>{console.error('login fail:', error, loginData)})
      
    } catch (error) {
      console.log(error);
      setloginerror(error.message);
    }    
  };


  const handleSignUp = async (e) => {
    e.preventDefault();
    try {

      const reigsterdata = {
        username: name,
        email: email,
    password: password,
    UserType: 'not set',
    }
    console.log("registering", reigsterdata)
    
    axios.post('http://localhost:3002/api/user/register', reigsterdata)
    .then((response) =>{
    console.log('register successful')
    console.log(response.data)

    localStorage.setItem('userid', response.data.user.id);
    localStorage.setItem('username', response.data.user.username);
    localStorage.setItem('email', response.data.user.email);
    localStorage.setItem('profilepic', response.data.user.profilepic)
    localStorage.setItem('token', response.data.user.token);
    
    console.log('Signed Up', name);
    setLoggedIn(true);
    setUserName(name);
    setModalOpen(false); // Close the modal after successful sign up
    setLogin(true); // socket IO provider context for indicating you've logged in
    }).catch((error)=>{
      console.error('failed to send to backend. Error:', error)
  })

    } catch (error) {
      console.log(error);

      setloginerror(error.message);
    }
  };

  const handleLogout = async () => {
    try {

      //setLogout(true);
      console.log('Logged Out');

      setLogin(false); // socket IO provider context for indicating you've logged in
      console.log("local delete", localStorage );
      setShowDropdown(true);
    } catch (error) {
      console.log(error);
    }

  };


  const values = {
    modalOpen, setModalOpen,
    email, setEmail,
    password, setPassword,
    username1, setUserName,
    displayName, setDisplayName,
    isLoggedIn, setLoggedIn,
    name, setName,
    loginerror, setloginerror,
    showDropdown, setShowDropdown,
    handleLogin, handleSignUp, handleLogout,
  };
  
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );

}



