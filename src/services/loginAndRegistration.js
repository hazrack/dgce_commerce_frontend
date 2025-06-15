import axios from 'axios';

const getBaseUrl = "http://localhost:8085/api/v1";

const axiosinstance = axios.create({
    baseURL: getBaseUrl,
});

export default axiosinstance;
