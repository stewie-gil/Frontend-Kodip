import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import { useSocketContext } from '../../hooks/useSocketContext.js';
import { AuthContext } from '../../context/AuthProvider.js';

import "./login.css";



function LoginForm(prop) {
    const {
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
} = useContext(AuthContext);


  //const [username1, setUserName] = useState('');

  const { login, setLogin, setLogout } = useSocketContext()
  

  //controlling the behaviour of the modal 

const toggleDropdownTrue = () => {setShowDropdown(true);};
const toggleDropdownFalse = () =>{setShowDropdown(false);}
const handleClick = () => {setModalOpen(true);};
const handleClose = () => {setModalOpen(false);};


  return (
    <div >
        {/* If user is not logged in activitate the modal using handleclick */}
      {!login && (
        <button onClick={handleClick} className="button1">Login</button>
      )}

        {/* If user is logged show a button with the users name 
        if the button is clicked show the same button and another button below promptin gfor a logout 
        
        */}
      {login && (

                <div>
          <div className="dropdownContainer">
            {!showDropdown && <button onClick={toggleDropdownTrue} className="text" style={{fontSize: '18px'}}>
              Welcome {localStorage.username} 😊!
            </button>}

            {showDropdown && <button onClick={toggleDropdownFalse} className="text" style={{fontSize: '18px'}}>
              Welcome {localStorage.username} 😊!
            </button>}

            {showDropdown && (
              <div className="dropdownMenu">
                <button onClick={handleLogout} className="text" style={{fontSize: '12px'}}>
                  Logout?
                </button>
              </div>
            )}
          </div>
        </div>
        )}
    
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleClose}
        className="modal"       
      >
         {/* displayName shows either the login or register  depending on whether user clicks login or signup buttons
        
        */}
        {!displayName && (
          <form onSubmit={handleLogin} className="form">
          <p style = {{fontWeight: 'bold'}}> Welcome back! Login with your details below 😊! </p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            <button type="submit" className="button" onClick = {toggleDropdownFalse}>Log in</button>
            <button onClick={() => setDisplayName(true)} className="button">Sign Up</button>
          {loginerror && (
          <p style={{ color: '#ff6b6b', fontStyle: 'italic', fontWeight: 'bold', padding : '0 px', margin: '50px 0' }}>{loginerror}</p>
          )}

          </form>
        )}
        {displayName && (
          <form onSubmit={handleSignUp} className="form">
          <p style = {{fontWeight : 'bold'}}> New to Kodip? Sign up today 😊! </p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            <input
              type="text"
              placeholder="How should we call you?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
            <button type="submit" className="button" style = {{padding : '0 px', margin : '4px 0'}}>Sign up</button>
            <p style = {{padding : '0 px', margin: '4px 0'}}> Or </p>
            <button onClick={() => setDisplayName(false)} className="button" style = {{padding : '0 px', margin : '0 px'}}>Login</button>

            {loginerror && (<p style={{ color: '#ff6b6b', fontStyle: 'italic', fontWeight: 'bold', padding : '0 px', margin: '4px 0' }}>{loginerror}</p>)}



          </form>
        )}
            </Modal>
      
    </div>
  );
}

export default LoginForm;

