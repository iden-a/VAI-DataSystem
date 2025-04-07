import axios from 'axios';

const token = localStorage.getItem('jwt_token');


const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }), // attach token if available, this is important for user-authenticated access for data!
    },
});


export default API;



