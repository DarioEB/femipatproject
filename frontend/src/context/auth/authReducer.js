import { types } from "../../types";


export const authReducer = (state, action) => {

    switch(action.type) {
        case types.GET_USER_BY_SIGN_TOKEN:
        case types.SIGN_UP_USER:
        case types.CHECK_TOKEN_USER:
        case types.LOGIN_USER:
            return {
                ...state,
                authLoading: true
            }
        case types.GET_USER_BY_SIGN_TOKEN_SUCCESS:
            return {
                ...state,
                authLoading: false,
                userSignUp: action.payload.user,
            }

        case types.GET_USER_BY_SIGN_TOKEN_ERROR:
            return {
                ...state,
                authLoading: false,
                userSignUp: {}
            }

        case types.SIGN_UP_USER_SUCCESS:
            return {
                ...state,
                authLoading: false,
                userSignUp: {},
                authenticated: true,
                user: action.payload.user
            }
            
        case types.SIGN_UP_USER_ERROR:
            return {
                ...state,
                authLoading: false,
            }
        
        case types.CHECK_TOKEN_USER_SUCCESS:
            return {
                ...state,
                authLoading: false,
                authenticated: true,
                user: action.payload.user
            }
        case types.CHECK_TOKEN_USER_ERROR:
            return {
                ...state,
                authLoading: false,
                authenticated: false,
                user: {}
            }
        case types.LOGIN_USER_SUCCESS:
            return {
                ...state,
                authLoading: false,
                authenticated: true,
                user: action.payload.user
            }
        case types.LOGIN_USER_ERROR:
            return {
                ...state,
                authLoading: false,
                user: {},
                authenticated: false
            }
        case types.LOGOUT_USER:
            return {
                ...state,
                authenticated: false,
                user: {}
            }
        default:
            return state;
    }
}