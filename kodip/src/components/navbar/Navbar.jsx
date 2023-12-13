import React from "react";
import logo from "../../assets/images/logo.png";

import "./navbar.css";
import { ArrowDown2 } from "iconsax-react";

const Navbar = () => {
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

  return (
    <div className="nav-bar">
      <div className="logo">
        <img src={logo} alt="logo" />
        <h2>Kodip</h2>
      </div>
      <div className="nav-links">
        {navLink.map((item, idx) => {
          return (
            <ul key={idx}>
              <li className={item.name === "Sign up" ? "signup" : undefined}>{item.name} {item.icon}</li>
            </ul>
          )
        })}
      </div>
    </div>
  );
};

export default Navbar;
