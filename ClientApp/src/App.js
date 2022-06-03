import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Layout from './layout';
import { Spin } from 'antd';
import routes from './routes';
import LoginPage from './pages/account/login';

const App = () => (
    <Suspense fallback={
        <div className='fixed w-screen h-screen'>
            <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
                <Spin size="large" />
            </div>
        </div>
    }>
        <BrowserRouter>
            <Routes>
                <Route path='/login' exact element={<LoginPage />} />
                <Route path="/" element={<Layout><Outlet /></Layout>}>
                    {
                        routes.map(({ path, exact, component: Element, ...restProps }) => (
                            <Route
                                key={path}
                                path={path}
                                exact={exact}
                                element={<Element {...restProps} />}
                            />
                        ))
                    }
                </Route>
            </Routes>
        </BrowserRouter>
    </Suspense>
)

export default App;