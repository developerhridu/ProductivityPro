import axios from "axios";
import {SuccessToast, ErrorToast } from "../helpers/FormHelper";
import { getToken, setToken, setUserDetails } from "../helpers/SessionHelper";

const baseURL = "http://localhost:5000/api/v1";

export async function LoginRequest(email, password) {
    try {
        const URL = baseURL+"/login";
        const postData = { email, password };

        const res = await axios.post(URL, postData);

        if (res.status === 200) {
            const { token } = res.data;
            setToken(token);
            // setUserDetails(res.data.data);
            // SuccessToast('Login Success');
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
