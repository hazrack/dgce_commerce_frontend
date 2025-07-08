import axios from 'axios';

const getBaseUrl = "http://37.59.111.254:8085/api/v1";

const axiosinstance = axios.create({
    baseURL: getBaseUrl,
});

export default axiosinstance;
