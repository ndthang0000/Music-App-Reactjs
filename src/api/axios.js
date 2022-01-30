import axios from 'axios';
import queryString from 'query-string';
import env from "react-dotenv";

const axiosClient = axios.create({
    baseURL: env.API_URL+'/api',
    paramsSerializer: params => queryString.stringify(params),
});

// axiosClient.interceptors.request.use(async (config) => {
//     // Handle token here ...
//     return config;
// })
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
    }, (error) => {
    // Handle errors
    console.log(error)
});

export default axiosClient;