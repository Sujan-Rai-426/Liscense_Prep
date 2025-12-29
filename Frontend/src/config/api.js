
import axios  from "axios";

const isProduction = import.meta.env.MODE === 'production';

const apiURL = isProduction ? import.meta.env.VITE_API_URL_PRODUCTION : import.meta.env.VITE_API_URL_DEVELOPMENT;

const api = axios.create(
    { baseURL : apiURL }
);

export default api;