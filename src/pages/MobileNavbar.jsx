import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import '../styles/Landing/mobilenav.css'
import { IoMdArrowBack } from "react-icons/io";
import '../styles/Landing/mobilenav.css'; // Import mobile navbar styles
import NewInput from '../components/Input/NewInput';

function MobileNavbar() {
  const navigate = useNavigate();

  const handleSearch = () => {
    // Navigate to search page even without query
    navigate('/searchpage');
  };

  const Backicon =()=>{
    navigate('/')
  }

  return (
    <div className='mobile-navbar'>

        <div className="leftmob"><IoMdArrowBack className='backicon' onClick={Backicon}/></div>
        <div className="centermob"><NewInput placeholder=" Search for products"  className="searchmob"/></div>
        <div className="leftmob"><IoSearch className='searchicon'/></div>



    </div>
  );
}

export default MobileNavbar;
