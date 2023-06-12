import { notifyError, notifySuccess } from "../component/Toaster";
import { API_URL } from "../constants/api";
import axios from "axios";
export const userActions = {
    getUsers,
    getUser,
    postUser,
    putUser,
};

const headers = {
    "Content-Type": "application/json",
}

async function getUsers(
    setData,
    setLoading,
    setPageCount,
    sizePerPage,
    currentPage,
    filters,
    searchText
) {
    try {
        let q = searchText.trim();
        let query = `?q=${q}&page=${currentPage}&sizePerPage=${sizePerPage}`;

        if (filters.roles.length) {
            query += `&roles=${filters.roles.toString()}`;
        }

        headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        const res = await axios.get(`${API_URL}/api/v1/users${query}`, { headers });

        setData(res.data.data);
        setPageCount(Math.ceil(res.data.total / sizePerPage));
        setLoading(false);
    } catch (error) {
        if (error.response && error.response.status == 401) {
            notifyError("Session Expired... Please Relogin");
            localStorage.clear();
            window.location.reload(2000);
        } else if (error.response?.data?.error) {
            notifyError(error.response.data.error);
        } else {
            notifyError("Something went wrong");
        }
        setLoading(false);
    }
}

async function getUser(
    id,
    setSingleData,
    setButtonDisabled,
    setOpenAddEditModal
) {
    try {
        headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        const res = await axios.get(`${API_URL}/api/v1/users/${id}`, { headers });
        setSingleData(res.data)
        setOpenAddEditModal(true)
    } catch (error) {
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
    setButtonDisabled(false)
}

async function postUser(
    data,
    setButtonDisabled,
    setOpenAddEditModal,
    setUpdateTable,
    updateTable
) {
    try {
        headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        const res = await axios.post(`${API_URL}/api/v1/users`, data, { headers });

        notifySuccess(res.data);
        setOpenAddEditModal(false)
        setUpdateTable(!updateTable)
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
    setButtonDisabled(false)
}

async function putUser(
    id,
    data,
    setButtonDisabled,
    setOpenAddEditModal,
    setUpdateTable,
    updateTable
) {
    try {
        headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        const res = await axios.put(`${API_URL}/api/v1/users/${id}`, data, { headers });
        notifySuccess(res.data);
        setOpenAddEditModal(false)
        setUpdateTable(!updateTable)
    } catch (error) {
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
    setButtonDisabled(false)
}