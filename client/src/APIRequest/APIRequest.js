import axios from "axios";
import {SuccessToast, ErrorToast } from "../helpers/FormHelper";
import { getToken, setToken, setUserDetails } from "../helpers/SessionHelper";


const baseURL = "http://localhost:5000/api/v1";
const AxiosHeader = {headers:{"token":getToken()}}

export async function LoginRequest(email, password) {
    try {
        const URL = baseURL+"/login";
        const postData = { email, password };

        const res = await axios.post(URL, postData);

        if (res.status === 200) {
            const { token } = res.data;
            setToken(token);
            // setUserDetails(res.data.data);
            // SuccessToast('LoginPage Success');
            return true;
        } else {
            // ErrorToast('Invalid Email or Password');
            return false;
        }
    } catch (err) {
        // ErrorToast('Something Went Wrong');
        return false;
    }
}


export async function RegisterRequest(firstName, lastName, email, password) {
    const URL = baseURL+"/register";
    const postData = { firstName, lastName, email, password };

    try {
        const res = await axios.post(URL, postData);
        if (res.status === 200) {
            alert('Registration successful!');
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Registration failed. Please try again.');
        return false;
    }
}



export async function ReadTaskRequest() {
    const URL = baseURL+"/readAllTask";

    try {
        const response = await axios.get(URL, AxiosHeader);

        if (response.status === 200) {
            const { tasks } = response.data;
            return tasks;
        } else {
            throw new Error('Error fetching tasks');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

