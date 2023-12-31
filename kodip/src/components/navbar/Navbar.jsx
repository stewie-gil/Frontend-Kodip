import React, { useState } from "react";
import logo from "../../assets/images/logo.png";

import "./navbar.css";
import { ArrowDown2, CloseSquare, HambergerMenu } from "iconsax-react";
import useOverlay from "../../hooks/useOverlay";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { overlay, setOverlay } = useOverlay();

  const navLink = [
    {
      name: "About us",
      link: "",
      icon: "",
    },
    {
      name: "Article",
      link: "",
      icon: "",
    },
    {
      name: "Property",
      link: "",
      icon: <ArrowDown2 color="white" size={16} />,
    },
    {
      name: "Sign up",
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
          {navLink.map((item, idx) => {
            return (
              <ul key={idx}>
                <li className={item.name === "Sign up" ? "signup" : undefined}>
                  {item.name} {item.icon}
                </li>
              </ul>
            );
          })}
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
