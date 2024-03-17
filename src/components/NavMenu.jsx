import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import hamburgerMenu from '/icons/hamburgerMenu.svg'
import xLg from '/icons/x-lg.svg'

const NavMenu = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div id='nav-menu-div'>
      <button
        className='hamburger-button' 
        onClick={toggleMenu}
        >
          {!isOpen && <img src={hamburgerMenu} alt="" />}
          {isOpen && <img src={xLg} alt="" />}
      </button>
      
        <div className={`menu-items ${isOpen? 'open' : 'closed'}`}>
          {/* Menu Items */}
            <NavLink className="menu-item" to="/scuttlebutt/profile">Profile</NavLink>
          
            <NavLink className="menu-item" to="/scuttlebutt/join">Join Game</NavLink>
         
            <NavLink className="menu-item" to="/scuttlebutt/host">Host Game</NavLink>
      
            <NavLink className="menu-item" to="/scuttlebutt/rules">Rules</NavLink>   

            <NavLink className="menu-item" to="/scuttlebutt/settings">Settings</NavLink>     
        </div>
      
    </div>
  );
}

export default NavMenu