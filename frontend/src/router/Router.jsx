import { Routes, Route, Navigate } from 'react-router-dom';
import {
    AuthLayout, 
    DashLayout
} from '../components';

import {
    AuthenticationPage,
    LoginPage, 
    SignUpPage,
    UsersPage
} from '../pages';

export const Router = () => {
    

    return (
        <Routes>
            <Route path={'/'} element={<AuthLayout />}>
                <Route index element={<LoginPage />} />
                <Route path={'sign-up/:signToken'} element={<SignUpPage />} />
                <Route path={'auth/:token'} element={<AuthenticationPage />} />
                <Route path={'*'} element={<Navigate to={'/'} />} />
            </Route>


            <Route path={'/dashboard'} element={<DashLayout />}>
                <Route path={'users'} element={<UsersPage />} />
                <Route path={'*'} element={<Navigate to={'/'} />} />
            </Route>
        </Routes>
    )
}