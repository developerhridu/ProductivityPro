import React from 'react';
import RegisterComponent from "../components/Register";
import toast, { Toaster } from 'react-hot-toast';


const RegisterPage = () => {
    return (
        <div>
            <RegisterComponent/>
            <Toaster position="top-center" />
        </div>
    );
};

export default RegisterPage;