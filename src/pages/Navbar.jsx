import React, { useState } from 'react';
import logonavbar from '../assets/Logomark.png';
import { RiShoppingCartLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { CiSearch } from 'react-icons/ci';
import '../styles/Landing/navbar.css';

function Navbar() {
  const [showMiddle, setShowMiddle] = useState(false);

  const toggleMiddleVisibility = () => {
    setShowMiddle(!showMiddle); // Toggle the state to show/hide .middle
  };

  return (
    <div className='navbar'>
      <div className='left'>
        <div className='logo'>
          <img src={logonavbar} alt='' />
        </div>
        <div className='logoname'>Logo</div>
      </div>

      <div className='middle-container'>
        <div className={`middle ${showMiddle ? 'show' : ''}`}>
          <div className='midlecontents'>Home</div>
          <div className='midlecontents'>Categories</div>
          <div className='midlecontents'>About</div>
          <div className='midlecontents'>Contact</div>
        </div>
      </div>

      <div className='right'>
        <div className='searchdiv'>
          <CiSearch className='searchicon' /> <p className='searchp'>Search Products</p>
        </div>
        <div className='cart'>
          <RiShoppingCartLine className='cart-icon' />
        </div>
        <div className='user'>
          <CgProfile className='profile-icon' />
        </div>

        <div className='toggle-icon' onClick={toggleMiddleVisibility}>
          &#9776;
        </div>
      </div>
    </div>
  );
}

export default Navbar;
