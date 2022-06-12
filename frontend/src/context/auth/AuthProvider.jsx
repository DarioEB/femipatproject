import { useReducer } from 'react';
import { types } from '../../../types';
import {
    AuthContext,
    authReducer
} from './';

import { api } from '../../config';

const INITIAL_STATE = {
    authenticated: false,
    user: {},
    authLoading: false,
}

const AuthProvider = ({children}) => {

    const [ state, dispatch ] = useReducer(authReducer, INITIAL_STATE); 

    const authenticatedUser = async () => { } 
    
    const checkTokenUser = async () => { }

    const getUserBySignToken = async (signToken) => {
        dispatch({ type: types.GET_USER_BY_SIGN_TOKEN });

        try {
            const { data } = await api.get(`/auth/sign-up/${signToken}`);
            dispatch({ type: types.GET_USER_BY_SIGN_TOKEN_SUCCESS, payload: data });

            return {
                ok: data.ok,
                user: data.user
            }
        } catch (error) {
            console.log(error.response.data);
            dispatch({ type: types.GET_USER_BY_SIGN_TOKEN_ERROR, payload: error.response.data });
            return {
                ok: error.response.data.ok,
                message: error.response.data.message
            }
        }
    }

    const loginUser = async (body) => { }

    const signUpUser = async (body) => { } 

    return (
        <AuthContext.Provider
            value={{
                ...state,
                // metodos
                authenticatedUser,
                checkTokenUser,
                getUserBySignToken,
                loginUser,
                signUpUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;