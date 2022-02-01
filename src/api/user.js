import axiosClient from "./axios"

export const register=(data)=>{
    console.log(data)
    return axiosClient.post('/register',data)
}