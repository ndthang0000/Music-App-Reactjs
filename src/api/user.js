import axiosClient from "./axios"

export const register=(data)=>{
    return axiosClient.post('/register',data)
}

export const getAllPlayList=(data)=>{
    return axiosClient.get(`/user/${data.uid}/play-list`)
}

export const addPlayList=(data)=>{
    return axiosClient.get(`/user/${data.uid}/play-list/add${data.id}`)
}