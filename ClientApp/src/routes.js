// import React, { lazy } from "react";
// import {
//     CodepenSquareFilled,
//     QqCircleFilled
// } from '@ant-design/icons';

import HomePage from './pages/home';
//const ProfilePage = lazy(() => import("@/pages/profile"))

const routes = [
    {
        path: "/",
        exact: true,
        title: 'Home',
        component: HomePage
    },
];

export default routes;