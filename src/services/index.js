import axios from 'axios'

const getBaseUrl = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem('token');
export default axios.create({
    baseURL: `${getBaseUrl}`,
    headers: {
        common: {
          'Authorization': `Bearer ${token}`
        }
      }
});
