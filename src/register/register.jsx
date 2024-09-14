import React, { useState } from 'react';
import './register.css';


function Register() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: ''
    });

    const handleNext = () => {
        if (step < 3){
            setStep(step + 1);
        }
        else{
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        console.log("Submitted");
    };

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
                    <div className='progress-container'>
                            <span className={`step-indicator ${step >= 1 ? 'active' : ''}`}>1</span>
                            <span className={`step-indicator ${step >= 2 ? 'active' : ''}`}>2</span>
                            <span className={`step-indicator ${step >= 3 ? 'active' : ''}`}>3</span>
                    </div>
                    <p className='register-header-text'>LET'S GET STARTED</p>
                    <br/>
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
                    </div>
                )}

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
                    </div>
                )}

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
                    </div>
                )}

                <button type='button' className='login-btn' onClick={handleNext}>
                    {step < 3 ? 'NEXT' : 'SUBMIT'}
                </button>

                </form>
            </div>
        </div>

    )
}

export default Register;