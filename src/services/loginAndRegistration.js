import axios from 'axios';

// const getBaseUrl = "https://4.231.1.245:8085/api/v1"; //ANSUT PROD
// const getBaseUrl = "http://160.154.48.253:8085/api/v1"; //COMEX REPLIQUE
// const getBaseUrl = "http://37.59.111.254:8085/api/v1";  //SERVER TEST VPS
const getBaseUrl = "http://localhost:8085/api/v1";  

const axiosinstance = axios.create({
    baseURL: getBaseUrl,
});

export default axiosinstance;
