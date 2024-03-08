import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import "./navbar.css";
import { ArrowDown2, CloseSquare, HambergerMenu } from "iconsax-react";
import useOverlay from "../../../hooks/useOverlay";

import LoginForm from "../../login/login";
import Connect from "../../connect/connect";
import ListProperty from '../../ListProperty/ListProperty';
import Notification from '../notification/notification';
import SearchBar from '../../../pages/searchbar';


const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { overlay, setOverlay } = useOverlay();
  const locationPath = useLocation().pathname;

  const navLink = [
    {
      name: "map",
      link: "/map",
      icon: "",
    },
    {
      name: "listings",
      link: "/listings",
      icon: "",
    },
    {
      name: "Connect with a local",
      link: "/connect",
      icon: "",
    },
    
   
  ];

  const openMenu = () => {
    setMenu(!menu);
    setOverlay(!overlay);
  };

  return (
    <>
      <div className="nav-bar">
        <div className="logo">
          <img src={logo} alt="logo" />
          
        </div>


        <div className="nav-links">
        
         {
          (locationPath == '/' &&        
            navLink.map((item, idx) => {
            return (
              <ul key={idx}>
                <li className= 'nav-button-style'>
                <Link style={{ textDecoration: 'none', color:'black', fontWeight:'700px', fontSize:'14px', minWidth:'80px' }} to={item.link}>{item.name}</Link> {item.icon}
                 
                </li>
              </ul>
            );
          }))   
          }
       <SearchBar/>
        <Link style={{ textDecoration: 'none', color:'black', }} to="/map">  <ListProperty/></Link> 
        <LoginForm/> 

        
        </div>
      </div>

      <div className="mobile-nav">
        <div className="mobile-logo">
          <img src={logo} alt="logo" />
          <HambergerMenu onClick={openMenu} />
        </div>

        


        <div className={!menu ? "none" : "mobile-menu"}>
          <div className="close-icon">
            <CloseSquare onClick={openMenu} />
          </div>
          
          <div className="nav-links">
            {navLink.map((item, idx) => {
              return (
                <ul key={idx}>
                  <li
                    className={item.name === "Sign up" ? "signup" : undefined}
                  >
                    {item.name} {item.icon}
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
