import axios from 'axios';

const getBaseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosinstance = axios.create({
    baseURL: getBaseUrl,
});

export default axiosinstance;
