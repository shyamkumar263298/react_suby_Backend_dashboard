import React, { useState } from 'react'
import { API_PATH } from '../../data/ApiPath';

const Register = ({showLoginHandler}) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log({ username, email, password });
            const response = await fetch(`${API_PATH}vendor/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
            console.log('response : ',response);
            const data = await response.json();

            if (response.ok) {
                console.log(data);
                setEmail('');
                setUsername('');
                setPassword('');
                alert('Vendor registered successfully');
                showLoginHandler();
            }

        } catch (error) {
            console.error('registration failed:', error.message || error);
            alert('Registration failed');
        }
    };

    return (
        <div className="registerSection">
            <form className='authForm' onSubmit={handleSubmit}>
                <h3>Vendor Register</h3>
                <label>User Name</label>
                <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter your name' /><br />
                <label>Email</label>
                <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' /><br />
                <label>Password</label>
                <input type="password" name='passowrd' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' /><br />
                <div className="btnSubmit">
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register
