import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { useMutation } from 'react-query';
import NameInput from '../components/Input/Nameinput';
import PasswordInput from '../components/Input/PasswordInput';
import EmailInput from '../components/Input/EmailInput';
import '../styles/signup.css'
import Buttonauth from '../components/Button/ButtonAuth';
import { Link, useNavigate } from 'react-router-dom';
import PhoneInput from '../components/Input/PhoneInput';
import Input from '../components/Input/Input';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      phone: ''
    });
    const [errorMsg, setErrorMsg] = useState('');
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const checkAvailability = async (url, key, value) => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({ [key]: value }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error(`Failed to check ${key} availability`);
        }
  
        const data = await response.json();
        console.log(`${key} check response:`, data);
        return data;
      } catch (error) {
        console.error(`Error checking ${key} availability:`, error);
        throw error;
      }
    };
  
    const checkEmailAvailability = async (email) => {
      return checkAvailability('https://portal.umall.in/api/check/customer/email', 'email', email);
    };
  
    const checkPhoneAvailability = async (phone) => {
      return checkAvailability('https://portal.umall.in/api/check/customer/number', 'phone', phone);
    };
  
    const registerUser = async (formData) => {
      try {
        const response = await fetch('https://portal.umall.in/api/customer/register', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to register user');
        }
  
        const data = await response.json();
        console.log('User registered successfully:', data);
        navigate('/');
      } catch (error) {
        console.error('Error during registration:', error);
        throw error;
      }
    };
  
    const { mutate: register, isLoading: isRegistering, isError: registrationError } = useMutation(registerUser);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const emailResponse = await checkEmailAvailability(formData.email);
        const phoneResponse = await checkPhoneAvailability(formData.phone);
  
        if (emailResponse.sts === '01') {
          console.log('Email already exists');
          return;
        }
  
        if (phoneResponse.sts === '01') {
          console.log('Phone number already exists');
          return;
        }
  
        await register(formData);
        
      } catch (error) {
        console.error('Error during registration:', error);
        setErrorMsg(error.message);
      }
    };
  return (
    <div className='signup'>
      <div className='signup-image'></div>

      <div className='signup-container'>
        <div className="headsignup"><h1 className='fasco'>LOGO</h1></div>
        <div className="titleofsignup">Elevate Your Shopping Experience – Sign Up Now</div>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center" className='inputs'>
            <Grid item xs={12} lg={12}>
              <Input value={formData.name} onChange={handleInputChange} placeholder='Name' name='name'/>
            </Grid>
            <Grid item xs={12} lg={12}>
              <EmailInput value={formData.email} onChange={handleInputChange}/>
            </Grid>
            <Grid item xs={12} lg={12}>
              <PasswordInput value={formData.password} onChange={handleInputChange}/>
            </Grid>
            <Grid item xs={12} lg={12}>
"              <PhoneInput value={formData.phone} onChange={handleInputChange} />
"            </Grid>
          </Grid>

          <div className="but">
            <Buttonauth type="submit" text="Signup" /> {/* Correct component name */}
          </div>
        </form>

        <div>
          <p className='signupfoot'>Already have an account? <Link to={'/login'} className='link'><span>Login Now</span></Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
