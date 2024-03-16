import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import hamburgerMenu from '/icons/hamburgerMenu.svg'

const NavMenu = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div>
      <button
        className='hamburger-button' 
        onClick={toggleMenu}
        >
          <img src={hamburgerMenu} alt="" />
      </button>
      {isOpen && (
        <div className='menu-items'>
          {/* Menu Items */}
            <NavLink to="#">Profile</NavLink>
          
            <NavLink to="#">Join</NavLink>
         
            <NavLink to="#">Host</NavLink>
      
            <NavLink to="#">Rules</NavLink>     
        </div>
      )}
    </div>
  );
}

export default NavMenu