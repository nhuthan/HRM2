

import HomePage from './pages/home';
import DepartmentPage from './pages/department';

const routes = [
    {
        path: "/",
        exact: true,
        title: 'Home',
        component: HomePage
    },
    {
        path: "/departments",
        title: 'Phòng ban',
        component: DepartmentPage
    },
];

export default routes;