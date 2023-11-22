import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

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
                console.log("reg");
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
        <div className='forms'>
            <form className='register' onSubmit={handleRegisterSubmit}>
                <input type="email" value={registerEmail} onChange={e => setRegisterEmail(e.target.value)} placeholder="Register email" />
                <input type="password" value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} placeholder="Register password" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;


