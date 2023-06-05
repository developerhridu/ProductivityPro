import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form fields
        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        // Validate email format using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email format.');
            return;
        }

        try {
            // Make a POST request to authenticate user
            const response = await axios.post('/api/v1/login', {
                email,
                password,
            });

            const user = response.data;

            if (!user) {
                alert('Email not found. Please sign up first.');
                return;
            }

            // Store the authenticated user ID in local storage or use a state management library like Redux
            localStorage.setItem('authenticatedUserId', user.id);

            // Redirect to home page or use React Router for navigation
            navigate('/home');
        } catch (error) {
            console.error('Error:', error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="container mt-8 col-xl-6">
            <h1>User Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                    />
                    <small id="emailError" className="form-text text-danger">{emailError}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/register')}>
                        Register
                    </button>

            </form>
        </div>
    );
};

export default LoginPage;
