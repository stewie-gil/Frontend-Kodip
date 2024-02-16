import React, { useState } from "react";
import logo from "../../assets/images/logo.png";

import "./navbar.css";
import { ArrowDown2, CloseSquare, HambergerMenu } from "iconsax-react";
import useOverlay from "../../hooks/useOverlay";

import LoginForm from "../login/login";
import Connect from "../connect/connect";
import ListProperty from '../ListProperty/ListProperty';
import Notification from '../notification/notification';


const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { overlay, setOverlay } = useOverlay();

  const navLink = [
    {
      name: "Connect with a local",
      link: "",
      icon: "",
    },
    {
      name: "List Your Property",
      link: "",
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
            navLink.map((item, idx) => {
            return (
              <ul key={idx}>
                <li className= 'undefined'>
                  {item.name} {item.icon}
                 
                </li>
              </ul>
            );
          })
          }
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
