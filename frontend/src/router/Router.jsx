import { Routes, Route } from 'react-router-dom';
import {
    AuthLayout, 
    DashLayout
} from '../components';

import {
    AuthenticationPage,
    LoginPage, 
    SignUpPage
} from '../pages';

export const Router = () => {

    return (
        <Routes>
            <Route path={'/'} element={<AuthLayout />}>
                <Route path={'login'} element={<LoginPage />} />
                <Route path={'sign-up/:signToken'} element={<SignUpPage />} />
                <Route path={'auth/:token'} element={<AuthenticationPage />} />
            </Route>


            <Route path={'/dashboard'} element={<DashLayout />}>

            </Route>
        </Routes>
    )
}