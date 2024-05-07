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
          <img 
            id="menu-icon" 
            className={`menu-icon ${isOpen ? 'hidden' : 'visible'}`}
            src={hamburgerMenu} 
            alt="" 
            />
          <img 
            id="menu-icon" 
            className={`menu-icon ${isOpen ? 'visible' : 'hidden'}`}
            src={xLg} 
            alt="" 
            />
      </button>
      
        <div className={`menu-items ${isOpen? 'open' : 'closed'}`}>
          {/* Menu Items */}
            <NavLink 
              className="menu-item" 
              to="/scuttlebutt/profile"
              onClick={() => setIsOpen(false)}
              >
                Profile
              </NavLink>
          
            <NavLink 
              className="menu-item" 
              to="/scuttlebutt/join"
              onClick={() => setIsOpen(false)}
              >
                Join Game
              </NavLink>
      
            <NavLink 
              className="menu-item" 
              to="/scuttlebutt/rules"
              onClick={() => setIsOpen(false)}
              >
                Rules
              </NavLink>   

            <NavLink 
              className="menu-item" 
              to="/scuttlebutt/settings"
              onClick={() => setIsOpen(false)}
              >
                Settings
              </NavLink>     
        </div>
      
    </div>
  );
}

export default NavMenu