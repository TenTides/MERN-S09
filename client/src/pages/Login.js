import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

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
                // Save the token or perform any other actions after successful login
                console.log('Login successful. Token:', data.token);
                navigate('/images');
            } else {
                const data = await response.json();
                // Handle login error, e.g., display an error message
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const signin_btn = document.querySelector("#signin-btn");
    const signup_btn = document.querySelector("#signup-btn");
    const container = document.querySelector(".container");

    signup_btn.addEventListener('click', () => {
        container.classList.add("signup-mode");
    });

    signin_btn.addEventListener('click', () => {
        container.classList.remove("signup-mode");
    });

    return(
    <><head>
        <title>Sign In & Sign Up Form</title>
    </head>
    <body>
        <div class="container">
            <div class="forms-container">
                <div class="signin-signup">
                    <form action="" class="signin-form">
                        <h2 class="title">Sign in</h2>
                        <div class="input-field">
                            <i class="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" />
                        </div>
                        <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
                        </div>
                        <input type="submit" value="Login" class="btn solid" />
                    </form>

                    <form action="" class="signup-form">
                        <h2 class="title">Sign up</h2>
                        <div class="input-field">
                            <i class="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" />
                        </div>
                        <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
                        </div>
                        <input type="submit" value="Sign up" class="btn solid" />
                    </form>
                </div>
            </div>

            <div class="panels-container">
                <div class="panel left-panel">
                    <div class="content">
                        <h3>New here?</h3>
                        <p>Create an account and start using #Photo4U</p>
                        <button class="btn transparent" id="signup-btn">Sign up</button>
                    </div>

                    <img src="client/src/pages/img/log.svg" class="image" alt="" />
                </div>

                <div class="panel right-panel">
                    <div class="content">
                        <h3>Already a member?</h3>
                        <p>Login and welcome back to #Photo4U</p>
                        <button class="btn transparent" id="signin-btn">Sign in</button>
                    </div>

                    <img src="client/src/pages/img/reg.svg" class="image" alt="" />
                </div>
            </div>
        </div>
    </body></>    
    );
};

export default Login;
