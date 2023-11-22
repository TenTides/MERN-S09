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

    return (
        <div className='forms'>
            <form className='login' onSubmit={handleLoginSubmit}>
                <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="Login email" />
                <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="Login password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;


