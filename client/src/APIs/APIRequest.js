import axios from "axios";
import { getToken, setToken } from "../helpers/SessionHelper";
import FullScreenLoader from "../components/FullScreenLoader";
import React from "react";


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
    const URL = baseURL+"/getTasks";
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
        throw new Error('Internal server error');
    }
}
export async function UserProfileRequest() {
    const URL = baseURL+"/profileDetails";
    try {
        const response = await axios.get(URL, AxiosHeader);

        if (response.status === 200) {
            const { user } = response.data;
            return user;
        } else {
            throw new Error('Error fetching tasks');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function AddTaskRequest( taskName, taskCategory, taskStatus, taskDescription, responsiblePerson, startDate, endDate  ) {
    const URL = baseURL+"/addTask";
    const postData = { taskName, taskCategory, taskStatus, taskDescription, responsiblePerson, startDate, endDate  };

    try {
        const res = await axios.post(URL, postData, AxiosHeader);
        if (res.status === 200) {
            alert('Task added successfully!');
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Task adding failed. Please try again.');
        return false;
    }
}

export async function UpdateTaskRequest(taskId, taskName, taskCategory, taskStatus, taskDescription, responsiblePerson, startDate, endDate
) {
    const URL = baseURL+"/updateTask/:taskID";
    const requestData = {
        taskName,
        taskCategory,
        taskStatus,
        taskDescription,
        responsiblePerson,
        startDate,
        endDate,
    };

    try {
        const res = await axios.put(URL, requestData, AxiosHeader);
        if (res.status === 200) {
            alert('Task updated successfully!');
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Task update failed. Please try again.');
        return false;
    }
}

export async function GetTaskRequest(taskID) {
    // let URL=BaseURL+"/listTaskByStatus/"+Status;
    const URL = baseURL+"/getTask/"+taskID;
    console.log("Hridu Test", URL);

    try {
        const res = await axios.get(URL, AxiosHeader);
        if (res.status === 200) {
            return res.data;
        } else {
            throw new Error('Failed to get task');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function DeleteTaskRequest(taskID) {
    const URL = baseURL + "/deleteTask/${taskID}";

    try {
        const res = await axios.delete(URL, AxiosHeader);
        if (res.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}




