import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { SuccessToast, ErrorToast, IsEmail } from '../helpers/FormHelper';
import { LoginRequest } from '../APIs/APIRequest';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            ErrorToast('Please fill in all fields.');
            return;
        }

        if (!IsEmail(email)) {
            ErrorToast('Invalid Email Address');
            return;
        }

        try {
            const success = await LoginRequest(email, password);

            if (success) {
                // SuccessToast('LoginPage Success');
                window.location.href = '/';
            } else {
                ErrorToast('Email not found. Please sign up first.');
                // navigate('/register');
            }
        } catch (error) {
            console.error('Error:', error);
            ErrorToast('LoginPage failed. Please try again.');
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

                <button type="submit" className="btn btn-primary">
                    Login
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/register')}>
                    Register
                </button>
            </form>
            <Toaster position="top-center" />
        </div>
    );
};

export default LoginPage;
