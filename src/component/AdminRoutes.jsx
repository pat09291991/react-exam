import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const AdminRoutes = () => {
    const isAuthenticated = localStorage.getItem('token');
    const roles = localStorage.getItem('roles');
    const location = useLocation();

    return (
        isAuthenticated && roles.includes("Administrator") ?
            <Outlet /> :
            <Navigate to="/" replace state={{ from: location}} />
    );
}

export default AdminRoutes;