import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const PrivateRoutes = () => {
    const isAuthenticated = localStorage.getItem('token');
    const location = useLocation();

    return (
        isAuthenticated ?
            <Outlet /> :
            <Navigate to="/login" replace state={{ from: location}} />
    );
}

export default PrivateRoutes;