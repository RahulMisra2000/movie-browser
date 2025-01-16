import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/menu.css';

const Navigation = () => {
  return (
    <nav className="menu">
      <div className="menu-content">
        <div className="logo">
          Movie Browser
        </div>
        <div className="menu-links">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 