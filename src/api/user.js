import axiosClient from "./axios"

export const register=(data)=>{
    return axiosClient.post('/register',data)
}

export const getAllPlayList=(data)=>{
    return axiosClient.get(`/me/play-list`)
}

export const getDetailPlayList=(data)=>{
    return axiosClient.get(`/me/play-list/detail/${data}`)
}

export const editPlayList=(data)=>{
    return axiosClient.post(`/me/play-list/edit`,data)
}

export const createPlayList=(data)=>{
    return axiosClient.post(`/me/play-list/create`,data)
}

export const addPlayList=(data)=>{
    return axiosClient.post(`/me/play-list/add`,data)
}

export const upload=(data)=>{
    return axiosClient.post('/me/upload',data)
}