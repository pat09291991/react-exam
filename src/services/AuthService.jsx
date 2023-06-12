import { notifyError } from "../component/Toaster";
import { API_URL } from "../constants/api";
import axios from "axios";
export const authActions = {
    login,
    logout,
};

async function login(data, setError, navigate, setRoles, setButtonDisabled) {
    try {
        const res = await axios.post(`${API_URL}/api/v1/auth`, data);
        const { token, roles, name, office } = res.data;
        setRoles(roles)
        localStorage.setItem('token', token);
        localStorage.setItem('roles', roles);
        localStorage.setItem('name', name);

        if (JSON.parse(roles).includes("Administrator")) {
            navigate('/users');
        } else {
            navigate('/');
        }
        setButtonDisabled(false)
    } catch (error) {
        if (error.response?.data && error.response.data?.error) {
            setError(error.response.data.error);
        } else {
            setError("Something went wrong");
        }
        setButtonDisabled(false)
    }
}

async function logout(navigate) {
    try {
        await axios.get(`${API_URL}/api/v1/logout`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            }
        });
        navigate('/login')
        localStorage.clear();
        window.location.reload(2000);
    } catch (error) {
        console.log(error)
        if (error.response && error.response.status == 401) {
            notifyError("Session Expired... Please Relogin");
            localStorage.clear();
            window.location.reload(2000);
        } else if (error.response?.data && error.response.data?.error) {
            notifyError(error.response.data.error);
        } else {
            notifyError("Something went wrong");
        }
    }
}