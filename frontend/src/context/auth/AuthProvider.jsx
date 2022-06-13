import { useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';

import { types } from '../../types';
import {
    AuthContext,
    authReducer
} from './';

import { api } from '../../config';

const INITIAL_STATE = {
    authenticated: false,
    user: {},
    authLoading: false,
    userSignUp: {}
}

const AuthProvider = ({children}) => {

    const [ state, dispatch ] = useReducer(authReducer, INITIAL_STATE); 

    useEffect( () => {
        checkTokenUser();
    }, []);

    const authenticatedUser = async () => { } 
    
    const checkTokenUser = async () => {  
        if(!Cookies.get('femipatAuthToken')) {
            return ;
        }
        dispatch({ type: types.CHECK_TOKEN_USER });
        
        try {
            const { data } = await api.get('/auth/check');
            dispatch({ type: types.CHECK_TOKEN_USER_SUCCESS, payload: data });
            Cookies.set('femipatAuthToken', data.token);
        } catch (error) {
            console.log(error.response);
            dispatch({ type: types.CHECK_TOKEN_USER_ERROR })
        }
    }

    const getUserBySignToken = async (signToken) => {
        dispatch({ type: types.GET_USER_BY_SIGN_TOKEN });
        let response;

        try {
            const { data } = await api.get(`/auth/sign-up/${signToken}`);
            dispatch({ type: types.GET_USER_BY_SIGN_TOKEN_SUCCESS, payload: data });
            response = {
                ok: data.ok,
                user: data.user,
            }
        } catch (error) {
            console.log(error.response.data);
            dispatch({ type: types.GET_USER_BY_SIGN_TOKEN_ERROR, payload: error.response.data });
            response = {
                ok: error.response.data.ok,
                message: error.response.data.message
            }            
        }

        return response;    
    }

    const loginUser = async (body) => { 
        dispatch({ type: types.LOGIN_USER });
        let response = {};
        try { 
            const { data } = await api.post('/auth/login', body);
            dispatch({ type: types.LOGIN_USER_SUCCESS, payload: data });
            Cookies.set('femipatAuthToken', data.token);
            response = {
                ok: data.ok
            }
        } catch (error) {
            console.log(error.response.data);
            dispatch({ type: types.LOGIN_USER_ERROR, payload: error.response.data });
            response = {
                ok: error.response.data.ok,
                message: error.response.data.message
            }
        }
        console.log(response);
        return response;
    }

    const logoutUser = async () => {
        Cookies.remove('femipatAuthToken');
        dispatch({ type: types.LOGOUT_USER });
    }

    const signUpUser = async (body, signToken) => { 
        dispatch({ type: types.SIGN_UP_USER });
        let response;
        try{
            const { data } = await api.put(`/auth/sign-up/${signToken}`, body);
            dispatch({ type: types.SIGN_UP_USER_SUCCESS, payload: data });
            Cookies.set('femipatAuthToken', data.token); 
            response = {
                ok: data.ok,
                user: data.user,
                message: data.message
            }
        } catch (error) {
            console.log(error.response);
            dispatch({ type: types.SIGN_UP_USER_ERROR, payload: error.response.data });
            response = {
                ok: error.response.data.ok,
                message: error.response.data.message
            }
        }

        return response;
    } 

    return (
        <AuthContext.Provider
            value={{
                ...state,
                // metodos
                authenticatedUser,
                checkTokenUser,
                getUserBySignToken,
                loginUser,
                logoutUser,
                signUpUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;