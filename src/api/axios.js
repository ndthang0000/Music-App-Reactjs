import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: 'http://localhost:5500/api',
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