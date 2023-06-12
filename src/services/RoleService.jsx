import { notifyError, notifySuccess } from "../component/Toaster";
import { API_URL } from "../constants/api";
import axios from "axios";
export const roleActions = {
    getRoles,
    getRole,
    postRole,
    putRole
};

const headers = {
    "Content-Type": "application/json",
}

async function getRoles(
    setData,
    setLoading,
    setPageCount,
    sizePerPage,
    currentPage,
    searchText
) {
    try {
        let q = searchText.trim();
        let query = `?q=${q}&page=${currentPage}&sizePerPage=${sizePerPage}`;

        headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        const res = await axios.get(`${API_URL}/api/v1/roles${query}`, { headers });
        setData(res.data.data)
        setLoading(false);
        setPageCount(Math.ceil(res.data.total / sizePerPage))
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
}

async function getRole(
    id,
    setSingleData,
    setButtonDisabled,
    setOpenAddEditModal
) {
    try {
        headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        const res = await axios.get(`${API_URL}/api/v1/roles/${id}`, { headers });
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

async function postRole(
    data,
    setButtonDisabled,
    setOpenAddEditModal,
    setUpdateTable,
    updateTable
) {
    try {
        headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        const res = await axios.post(`${API_URL}/api/v1/roles`, data, { headers });
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

async function putRole(
    id,
    data,
    setButtonDisabled,
    setOpenAddEditModal,
    setUpdateTable,
    updateTable
) {
    try {
        headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        const res = await axios.put(`${API_URL}/api/v1/roles/${id}`, data, { headers });
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