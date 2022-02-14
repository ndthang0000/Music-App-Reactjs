import axiosClient from "./axios"

export const getAllIdol=(data)=>{
    return axiosClient.get('/idol')
}

export const getOneIdol=(data)=>{
    return axiosClient.get(`/idol/${data}`)
}