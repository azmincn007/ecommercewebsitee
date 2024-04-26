import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { useMutation } from 'react-query';

import '../styles/login.css'
import Buttonauth from '../components/Button/ButtonAuth';
import { Link, useNavigate } from 'react-router-dom';
import ButtonReg from '../components/Button/Register';
import PasswordInput from '../components/Input/PasswordInput';
import Input from '../components/Input/Input';



function login() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleEmailOrPhoneChange = (event) => {
    const { value } = event.target;
    setEmailOrPhone(value);

    // Frontend verification: Check if email contains '@gmail' or if it's a valid phone number
    if (!value.includes('@gmail') && !isValidPhoneNumber(value)) {
      setEmailError('Please enter a valid email or phone number');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const isValidPhoneNumber = (input) => {
    return /^\d{10}$/.test(input);
  };

  const login = async (emailOrPhone, password) => {
    try {
      const formData = new FormData();
      formData.append('emailormobile', emailOrPhone);
      formData.append('password', password);

      const response = await fetch('https://portal.umall.in/api/customer/login', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        
        
        if (data.sts === '01') { 
          localStorage.setItem('userName', data.user.name);
          console.log(data);
          // Navigate to the landing page
          navigate('/');
        } else {
          // Display alert for failed login
          alert('Login credentials failed');
        }
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(emailOrPhone, password);
  };
  return (
    <div className='login'>
      <div className='login-image'></div>

      <div className='login-container'>
        <div className="headlogin"><h1 className='fasco'>LOGO</h1></div>
        <div className="titleoflogin">Elevate Your Shopping Experience – Sign Up Now</div>

        
        <form onSubmit={handleSubmit} className='forms'>
          <Grid container spacing={0} justifyContent="center" className='inputlogin'>
         
            <Grid item xs={12} lg={12}>
              <Input value={emailOrPhone} onChange={handleEmailOrPhoneChange}  placeholder="Email or PhoneNumber" name='emailorphone' 
                />
                  {emailError && <p className="error-message">{emailError}</p>}
                
            </Grid>
            <Grid item xs={12} lg={12}>
              <PasswordInput value={password} onChange={handlePasswordChange}/>
              {emailError && <p className="error-message">{emailError}</p>}

            </Grid>

            
            
            
            
          </Grid>

          <div className="buttonblack">
            <Buttonauth type="submit" text="Login" /> {/* Correct component name */}
          </div>
          <div className="buttonblack">
            <ButtonReg text="Register"/>
          </div>

          <div className='afterform'>
          <p className='loginfoot'>Forget your password? <Link to={'/forgetpass'} className='link'><span>click here</span></Link></p>
        </div>
        </form>

    
      </div>
    </div>
  );
}

export default login;