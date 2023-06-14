import React from 'react';
import LoginComponent from "../components/Login";
import toast, { Toaster } from 'react-hot-toast';

const LoginPage = () => {
    return (
        <div>
            <LoginComponent/>
            <Toaster position="top-center" />

        </div>
    );
};

export default LoginPage;