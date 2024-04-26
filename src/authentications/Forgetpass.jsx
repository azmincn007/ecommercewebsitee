import React, { useState } from 'react';
import { Grid } from '@mui/material';
import PhoneInput from '../components/Input/PhoneInput';
import '../styles/forgetpass.css';
import Buttonauth from '../components/Button/ButtonAuth';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input/Input';

function Forgetpass() {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isPhoneNumberRegistered, setIsPhoneNumberRegistered] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [additionalInputValue, setAdditionalInputValue] = useState('');
    const [resetButtonClicked, setResetButtonClicked] = useState(false);
    const [otp, setOtp] = useState('');

    const sendConfirmationCode = async (number) => {
        const response = await fetch('https://portal.umall.in/api/check-mobile', {
            method: 'POST',
            body: JSON.stringify({ number }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to send confirmation code');
        }

        const data = await response.json();

        if (data.sts === '00') {
            setIsPhoneNumberRegistered(false);
        } else {
            setIsPhoneNumberRegistered(true);
            setResetButtonClicked(true); // Set resetButtonClicked to true when OTP is received
        }

        return data;
    };

    const mutation = useMutation(sendConfirmationCode, {
        onSuccess: (data) => {
            console.log('Confirmation code sent successfully:', data);

            if (data.sts === '00') {
                console.log("not registered");
            }
        },
        onError: (error) => {
            setErrorMsg(error.message);
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setShowErrorMessage(true);
        mutation.mutate(phoneNumber);
    };

    const handleResetPassword = () => {
        console.log(typeof otp); // Logs the type of otp
        console.log(typeof mutation.data.otp); // Logs the type of mutation.data.otp
        
        if (otp === mutation.data.otp.toString()) {
            console.log("OTP match");
            navigate(`/newpassword?phoneNumber=${phoneNumber}`);
        } else {
            console.log("OTP does not match");
        }
    };

    return (
        <div className='forgetpass'>
            <div className='forgetpass-image'></div>

            <div className='forgetpass-container'>
                <div className="headforgetpass"><h1 className='fasco'>LOGO</h1></div>
                <div className="titleofforgetpass">Reset your password</div>

                <form onSubmit={handleSubmit} className='forms'>
                    <Grid container spacing={2} justifyContent="center" className='inputs-forgetpass'>
                        <Grid item xs={12} lg={12}>
                            <PhoneInput value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            {mutation.isLoading && <p>Loading...</p>}
                            {showErrorMessage && !mutation.isLoading && !isPhoneNumberRegistered && <p style={{ color: 'red' }}>Phone number is not registered</p>}
                        </Grid>
                        {mutation.isSuccess && mutation.data.sts === '01' && (
                            <Grid item xs={12} lg={12}>
<Input type="number" placeholder="Enter your OTP" name='otp' value={otp} onChange={(e) => setOtp(e.target.value)} />
                            </Grid>
                        )}
                    </Grid>

                    <div className="but">
                        {resetButtonClicked ? (
                            <Buttonauth type="button" text="Reset Password" onClick={handleResetPassword} />
                        ) : (
                            <Buttonauth type="submit" text="Send Confirmation Code" />
                        )}
                    </div>
                </form>

                {/* Display error message if showErrorMessage is true */}
                {showErrorMessage && <p style={{ color: 'red' }}>Incorrect OTP</p>}

                <div>
                <p className='forgetfoot'>Already have an account? <Link to={'/login'} className='link'><span>Login Now</span></Link></p>
                </div>
            </div>
        </div>
    );
}

export default Forgetpass;
