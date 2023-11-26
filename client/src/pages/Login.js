import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const SignInSignUpForm = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const navigate = useNavigate();
  
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
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error during login:', error);
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
          navigate('/login');
        } else {
          const data = await response.json();
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error during registration:', error);
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
                <form action="" className="signin-form">
                  <h2 className="title">Sign in</h2>
                  <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                  <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                  <input type="submit" value="Login" className="btn solid" onClick={handleLoginSubmit} />
                </form>
  
                {/* Register Form */}
                <form action="" className="signup-form">
                  <h2 className="title">Sign up</h2>
                  <input type="email" placeholder="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
                  <input type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
                  <input type="submit" value="Sign up" className="btn solid" onClick={handleRegisterSubmit} />
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
                    <img src="client/src/pages/img/log.svg" className="image" alt="" />
                </div>
    
                {/* Right Panel */}
                <div className="panel right-panel">
                    <div className="content">
                        <h3>Already a member?</h3>
                        <p>Login and welcome back to #Photo4U</p>
                        <button className="btn transparent" id="signin-btn">Sign in</button>
                    </div>
                    <img src="client/src/pages/img/reg.svg" className="image" alt="" />
                </div>
            </div>
        </div>
    );
  };
  
  const Login = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigate = useNavigate();
  
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
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };
  
    return (
        <div>
            <SignInSignUpForm />
        </div>
    );
  };
  
  const Register = () => {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const navigate = useNavigate();
  
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
          navigate('/login');
        } else {
          const data = await response.json();
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    };
  
    return (
        <div>
            <SignInSignUpForm />
        </div>
    );
  };
  
  export { Login, Register,SignInSignUpForm };
