import axios from 'axios'

const getBaseUrl = "http://37.59.111.254:8085/api/v1";
const token = localStorage.getItem('token');
export default axios.create({
    baseURL: `${getBaseUrl}`,
    headers: {
        common: {
          'Authorization': `Bearer ${token}`
        }
      }
});
