import React from "react";
import Users from "../Pages/Users/Users"
import Roles from "../Pages/Roles/Roles"
// const Roles = React.lazy(() => import("../Pages/Roles/Roles"))

const roles = localStorage.getItem('roles') ? localStorage.getItem('roles') : "";

const routes = [
    {
        name: "",
        path: "/",
        views: "",
        allowed_access: ["Administrator"]
    },
    {
        name: "Users",
        path: "/users",
        views: <Users />,
        allowed_access: ["Administrator"]
    },
    {
        name: "Roles",
        path: "/roles",
        views: <Roles />,
        allowed_access: ["Administrator"]
    }
];

const filteredRoutes = roles ? routes.filter(route => {
    const allowedAccess = route.allowed_access;
    const isAllowed  = allowedAccess.map(access => {
        return JSON.parse(roles).includes(access)
    })
    return isAllowed.includes(true)
}) : [];

export default filteredRoutes;