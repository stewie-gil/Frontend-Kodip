import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

//import styles from './loginform.module.css';
import axios from 'axios';
import "./login.css";







function LoginForm(prop) {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username1, setUserName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [loginerror, setloginerror] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

 





// who wants some cookies? 
//Lets set them below 
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days *60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  console.log('cookie set successfully:', document.cookie)
}



//use this function when getting cookies.
function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
          return cookieValue;
      }
  }
  return null;
}

// Get the value of the 'authToken' cookie
const authToken = getCookie('authToken');


//delete cookie if user logs out
function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  localStorage.setItem('userid', '');
  localStorage.setItem('username', '');
  console.log('cookie deleted successfully and storage cleared!', document.cookie)
  console.log('what is left of localstorage', localStorage)
}


if(authToken === null){
  localStorage.setItem('userid', '');
  localStorage.setItem('username', '');
  localStorage.setItem('email', '');
  localStorage.setItem('profilepic', '')
  
}







  

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };



  useEffect(() => {
    if (authToken !== null) {
      setLoggedIn(true);
      setUserName(true);
     
    }
  }, []); // The empty dependency array ensures that this effect runs only once after the initial render
  




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
      //console.log('Login in api was successful', response.data)
      //console.log(response.data)
      const {username, token, userid, profilepic} = response.data;

      //console.log('just checking whether response', response.data)
     
      // Storing the token in local storage
      setCookie('authToken', token, 7);
      localStorage.setItem('userid', userid);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('profilepic', profilepic);

      setUserName(username)
      // will check if token is invalid later etc...
      console.log('username after axios post:', username);


      
      console.log('Logged In');
      setLoggedIn(true);
      setName(name);
      setModalOpen(false); // Close the modal after successful login
      
     
      })
      .catch((error)=>{

          console.error('login fail:', error, loginData)
      })
      
    } catch (error) {
      console.log(error);
      setloginerror(error.message);
    }

    
  };


  //console.log(localStorage)




  
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      
      //sending details back to app.js
  
      //send details to authController in the backend via a post to API.
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

    setCookie('authToken', response.data.token, 3);
    localStorage.setItem('userid', response.data.user._id);
    localStorage.setItem('username', response.data.user.username);
    localStorage.setItem('email', response.data.user.email);
    localStorage.setItem('profilepic', response.data.profilepic)
    
    console.log('Signed Up', name);
    setLoggedIn(true);
    setUserName(name);
    setModalOpen(false); // Close the modal after successful sign up



    }).catch((error)=>{
      console.error('faild to send to backend. Error:', error)
  })

         


    } catch (error) {
      console.log(error);

      setloginerror(error.message);


    }
  };



  const handleLogout = async () => {
    try {

      setLoggedIn(false);
      console.log('Logged Out');
      setShowDropdown(true);
    } catch (error) {
      console.log(error);
    }
    //Delete the 'authToken' cookie
    deleteCookie('authToken');
  };


  const toggleDropdownTrue = () => {
    setShowDropdown(true);
  };

const toggleDropdownFalse = () =>
{
  setShowDropdown(false);
}



  return (
    <div >
      {!isLoggedIn && (
        <button onClick={handleClick} className="button1">Login</button>
      )}
      {
        isLoggedIn && (

                <div>
          {/* Dropdown Menu */}
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



        )
      }
    
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleClose}
        className="modal"
       
      >
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
            {loginerror && (
            <p style={{ color: '#ff6b6b', fontStyle: 'italic', fontWeight: 'bold', padding : '0 px', margin: '4px 0' }}>{loginerror}</p>
              )}



          </form>
        )}
            </Modal>
      
    </div>
  );
}

export default LoginForm;

