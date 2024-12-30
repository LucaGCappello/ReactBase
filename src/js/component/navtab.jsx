import React from 'react';
import './navtab.css';

const NavTab = () => {
  return (
    <div className="navtab">
      <button className="icon-button left-button">
        <img src="./icon.png" alt="icon" className="icon" />
      </button>
      <button className="icon-button right-button">
        <img src="./profile.png" alt="profile" className="profile-pic" />
      </button>
    </div>
  );
};

export default NavTab;