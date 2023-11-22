import React, { useState } from 'react';
import './Account.css';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
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
                console.log("reg");
            } else {
                const data = await response.json();
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

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

    return (
        <div className='forms'>
            <form className='register' onSubmit={handleRegisterSubmit}>
                <input type="email" value={registerEmail} onChange={e => setRegisterEmail(e.target.value)} placeholder="Register email" />
                <input type="password" value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} placeholder="Register password" />
                <button type="submit">Register</button>
            </form>
            <form className='login' onSubmit={handleLoginSubmit}>
                <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="Login email" />
                <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="Login password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Account;


