import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png"; // put your logo in src/images

const Header = () => {
  return (
    <nav className="navbar">
      <Link to="/"><img src={logo} alt="TechShop Logo" /></Link>
      <div>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Header;
