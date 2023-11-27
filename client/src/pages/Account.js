import React, { useState, useEffect } from 'react';
import './Account.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import logImage from './img/log.svg';  // Import the image
import regImage from './img/reg.svg';  // Import the image

const Account = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [registerError, setRegisterError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      fetch('/api/session')
        .then((response) => response.json())
        .then((data) => {
          if (data.userId) {
            navigate('/images')
            console.log('Token from session:', data.userId);
          } else {

          }
        })
        .catch((error) => console.error('Error fetching session data:', error));
    }, [])


    const handleLoginSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: loginEmail,
              password: loginPassword,
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log('Login successful. Token:', data.token);
            navigate('/images');
          } else {
            const data = await response.json();
            setLoginError(data.message); // Set error message          
          }
        } catch (error) {
            console.error('Error during login:', error);
            setLoginError('Error during login. Please try again.'); // Set generic error message
        }
      };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: registerEmail,
              password: registerPassword,
            }),
          });
    
          if (response.ok) {
            console.log("Registration successful");
            setRegisterError("Check your email for a confirmation link.");
          } else {
            const data = await response.json();
            setRegisterError(data.message); // Set error message            
          }
        } catch (error) {
            console.error('Error during registration:', error);
            setRegisterError('Error during registration. Please try again.'); // Set generic error message
        }
      };

    useEffect(() => {
      const signin_btn = document.querySelector("#signin-btn");
      const signup_btn = document.querySelector("#signup-btn");
      const container = document.querySelector(".container");
  
      const handleSignUpClick = () => {
        container.classList.add("signup-mode");
      };
  
      const handleSignInClick = () => {
        container.classList.remove("signup-mode");
      };
  
      signup_btn.addEventListener('click', handleSignUpClick);
      signin_btn.addEventListener('click', handleSignInClick);
  
      return () => {
        // Cleanup event listeners when the component unmounts
        signup_btn.removeEventListener('click', handleSignUpClick);
        signin_btn.removeEventListener('click', handleSignInClick);
      };
    }, []); // Empty dependency array ensures that the effect runs once after the initial render
  
    return (
            <div className="container">
                <div className="forms-container">
                    <div className="signin-signup">
                        {/* Login Form */}
                        <form action="" className="signin-form" onSubmit={handleLoginSubmit}>
                            <h2 className="title">Sign in</h2>
                            {loginError && <p className="error-message">{loginError}</p>}
                            <div className="input-field">
                                <FontAwesomeIcon icon={faEnvelope} className='i' />
                                {/*<img src="/envelope-solid.svg" class="image" alt="" />*/}
                                <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required maxLength="50"/>
                            </div>
                            <div className="input-field">
                                <FontAwesomeIcon icon={faLock} className='i' />
                                {/*<img src="/lock-solid.svg" class="image" alt="" />*/}
                                <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required maxLength="50" />
                            </div>
                            <input type="submit" value="Login" className="btn solid"/>
                        </form>
        
                        {/* Register Form */}
                        <form action="" className="signup-form" onSubmit={handleRegisterSubmit}>
                            <h2 className="title">Sign up</h2>
                            {registerError && <p className="error-message">{registerError}</p>}
                            <div className="input-field">
                                <FontAwesomeIcon icon={faEnvelope} className='i' />
                                {/*<img src="/envelope-solid.svg" class="image" alt="" />*/}
                                <input type="email" placeholder="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required maxLength="50"/>
                            </div>
                            <div className="input-field">
                                <FontAwesomeIcon icon={faLock} className='i' />
                                {/*<img src="/lock-solid.svg" class="image" alt="" />*/}
                                <input type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required maxLength="50"/>
                            </div>
                            <input type="submit" value="Sign up" className="btn solid"/>
                        </form>
                    </div>
                </div>
   
                {/* Panels Container */}
                <div className="panels-container">
                    {/* Left Panel */}
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New here?</h3>
                            <p>Create an account and start using #Photo4U</p>
                            <button className="btn transparent" id="signup-btn">Sign up</button>
                        </div>
                        <img src={logImage} className="image" alt="" />
                    </div>
        
                    {/* Right Panel */}
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>Already a member?</h3>
                            <p>Login and welcome back to #Photo4U</p>
                            <button className="btn transparent" id="signin-btn">Sign in</button>
                        </div>
                        <img src={regImage} className="image" alt="" />
                    </div>
                </div>
            </div>
    );
  };
  
  export default Account;