import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logonavbar from '../assets/Logomark.png';
import { RiShoppingCartLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { IoMenu, IoSearch } from 'react-icons/io5';
import '../styles/Landing/navbar.css';
import { useMediaQuery } from '@react-hook/media-query';

function Navbar() {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width: 900px)');
  const handleCloseMiddle = () => {
    setShowMiddle(false);
  };

  const [showMiddle, setShowMiddle] = useState(false);

  const toggleMiddleVisibility = () => {
    setShowMiddle(!showMiddle); // Toggle the state to show/hide .middle
  };

  const handleSearch = () => {
    if (isSmallScreen || searchText.trim() !== '') {
      navigate(`/searchpage?query=${encodeURIComponent(searchText)}`);
    }
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
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
          <div className='close-text' onClick={handleCloseMiddle}>
            Close
          </div>
        </div>
      </div>

      {/* Responsive Search Rendering */}
      <div className='right'>
        <div className='searchdiv'>
          <IoSearch
            className='searchicon'
            onClick={handleSearch}
          />
          {isSmallScreen || ( // Render input only on small screens or non-empty input
            <input
              type='text'
              className='searchp'
              placeholder='Search products'
              value={searchText}
              onChange={handleChange}
            />
          )}
        </div>
        <div className='cart'>
          <RiShoppingCartLine className='cart-icon' />
        </div>
        <div className='user'>
          <CgProfile className='profile-icon' />
        </div>
        <div className='toggle-icon'>
          <IoMenu className='menu-icon' onClick={toggleMiddleVisibility}/>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
