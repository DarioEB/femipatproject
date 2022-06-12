import axios from 'axios';

export const api = axios.create({
    baseURL: `${import.meta.env.VITE_FEMIPAT_BACKEND_URL}/api`,
    withCredentials: true,
    hedaers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
})