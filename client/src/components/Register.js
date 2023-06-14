import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterRequest } from '../APIRequest/APIRequest';

const Register = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!firstName || !lastName || !email || !password) {
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
            // Make a POST request to save user data
            const success = await RegisterRequest(firstName, lastName, email, password);

            if (success) {
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');

                // navigate('/login');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Registration failed. Please try again.');
        }
    };


    return (
        <div className="container mt-8 col-xl-6">
            <h1>User Registration</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter your first name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter your last name"
                        required
                    />
                </div>
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
                <button type="submit" className="btn btn-primary mx-auto">Register</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/login')}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Register;
