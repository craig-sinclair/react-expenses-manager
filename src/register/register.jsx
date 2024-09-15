import React, { useState } from 'react';
import axios from 'axios';
import './register.css';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../backend';

function Register() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        budget: 0,
        password: ''
    });

    const[errors, setErrors] = useState({});

    const navigate = useNavigate();

    // Helper function to check for valid email through regex
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Ensure username is not empty string, and contains no whitespaces
    const validateUsername = (username) => {
            return username.trim() !== '' && !username.includes(' ');
    };

    //Ensure password has an uppercase character, a digit, and is at least 8 characters
    const validatePassword = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        return password.length >= 8 && hasUppercase && hasNumber;
    };

    const handleNext = () => {
        setErrors({}); //Clear errors

        // At each step validate each item of form before submission
        if (step === 1) {
            if (!formData.email || !validateEmail(formData.email)) {
                setErrors({ email: 'Please enter a valid email address' });
                return;
            }
        } else if (step === 2) {
            if (!validateUsername(formData.username)) {
                setErrors({ username: 'Username cannot be empty or contain spaces' });
                return;
            }
        } else if (step === 3) {
            if (!validatePassword(formData.password)) {
                setErrors({ password: 'Password must contain at least 8 characters, one uppercase letter, and one number' });
                return;
            }
            handleSubmit(); 
            return;
        }
        
        setStep(step + 1);
    };

    // POST request to insert form information into postgreSQL database
    const handleSubmit = async () => {
        try{
            await registerUser(formData);
            console.log(`Registered user successfully`);
            navigate('/');
        }
        catch(error){
            console.log(`An error occurred!`, error)
        }
    };

    // Update form data on change of data in input textboxes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    return(
        <div className='background-container'>
            <div className='register-container'>
            <form className='register-form' onSubmit={(e) => e.preventDefault()}>

                    {/* Progress indicators for form */}
                    <div className='progress-container'>
                            <span className={`step-indicator ${step >= 1 ? 'active' : ''}`}>1</span>
                            <span className={`step-indicator ${step >= 2 ? 'active' : ''}`}>2</span>
                            <span className={`step-indicator ${step >= 3 ? 'active' : ''}`}>3</span>
                    </div>

                    <p className='register-header-text'>LET'S GET STARTED</p>
                    <br/>

                    {/* Email Address */}
                    {step === 1 && (
                    <div className='email-register-container'>
                        <input 
                            type='email' 
                            name='email' 
                            className='login-text-box' 
                            placeholder='Email Address' 
                            value={formData.email}
                            onChange={handleChange} 
                        />
                        {errors.email && <p className='error-text'>{errors.email}</p>}

                    </div>
                    )}

                    {/* Username */}
                    {step === 2 && (
                    <div className='username-register-container'>
                        <input 
                            type='text' 
                            name='username' 
                            className='login-text-box' 
                            placeholder='Username' 
                            value={formData.username}
                            onChange={handleChange} 
                        />
                        {errors.username && <p className='error-text'>{errors.username}</p>}

                    </div>
                    )}

                    {/* Password */}
                    {step === 3 && (
                    <div className='password-register-container'>
                        <input 
                            type='password' 
                            name='password' 
                            className='login-text-box' 
                            placeholder='Password' 
                            value={formData.password}
                            onChange={handleChange} 
                        />
                        {errors.password && <p className='error-text'>{errors.password}</p>}

                    </div>
                    )}

                    {/* Next/ submit button */}
                    <button type='button' className='login-btn' onClick={handleNext}>
                        {step < 3 ? 'NEXT' : 'SUBMIT'}  
                        {/* Set text content with ternary operator- submit from password (final) step, otherwise next */}
                    </button>
                </form>
            </div>
        </div>

    )
}

export default Register;