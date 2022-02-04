import axios from 'axios';
import queryString from 'query-string';
import env from "react-dotenv";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

console.log(env)
const axiosClient = axios.create({
    baseURL: env.API_URL+'/api',
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    const currentUser=firebase.auth().currentUser;
    if(currentUser){
        const idToken=await currentUser.getIdToken()
        config.headers.Authorization=`Bearer ${idToken}`
    }
    return config;
})
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