import { notifyError } from "../component/Toaster";
import { API_URL } from "../constants/api";
import axios from "axios";
export const filterActions = {
    getFilters,
};

const headers = {
    "Content-Type": "application/json",
}

async function getFilters(setSelectOptions) {
    try {
        headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        const res = await axios.get(`${API_URL}/api/v1/filters`, { headers });
        setSelectOptions(res.data)
    } catch (error) {
        if (error.response && error.response.status == 401) {
            notifyError("Session Expired... Please Relogin");
            localStorage.clear();
            window.location.reload(2000);
        } else if (error.response?.data && error.response.data?.error) {
            notifyError(error.response.data.error);
        } else {
            notifyError("Something went wrong while getting filters");
        }
    }
}