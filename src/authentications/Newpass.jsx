import React, { useState } from 'react';
import { Grid } from '@mui/material';
import '../styles/newpass.css';
import Buttonauth from '../components/Button/ButtonAuth';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../components/Input/Input';


function Newpass(props) {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const phoneNumber = searchParams.get('phoneNumber');
    console.log(phoneNumber);

   
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const resetPasswordMutation = useMutation(
        async () => {
            const formData = new FormData();
            formData.append('password', newPassword);
            formData.append('number', phoneNumber);
            
            // Call your API to reset password
            const response = await fetch('https://portal.umall.in/api/reset-password', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            return data;
        },
        {
            onSuccess: (data) => {
                console.log('Password reset successful:', data);
                // Handle successful password reset, for example, navigate to login page
                navigate('/login');
            },
            onError: (error) => {
                console.error('Password reset failed:', error);
                // Handle error
            }
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword === confirmPassword) {
            resetPasswordMutation.mutate();
        } else {
            console.error('Passwords do not match');
        }
    };

    return (
        <div className='newpass'>
            <div className='newpass-image'></div>
            <div className='newpass-container'>
                <div className="headnewpass"><h1 className='fasco'>LOGO</h1></div>
                <div className="titleofnewpass">Reset your password</div>
                <form className='forms' onSubmit={handleSubmit}>
                    <Grid container spacing={2} justifyContent="center" className='inputs-newpass'>
                        <Grid item xs={12} lg={12}>
                            <Input type="password" placeholder='New Password' value={newPassword} onChange={handleNewPasswordChange} />
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <Input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
                        </Grid>
                    </Grid>
                    <div className="but">
                        <Buttonauth type="submit" text="Reset Password" />
                    </div>
                </form>
                <div>
                    <p className='alreadyacc'>Already have an account? <span>login</span></p>
                </div>
            </div>
        </div>
    );
}

export default Newpass;
