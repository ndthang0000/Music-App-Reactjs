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
export const deleteSongFromPlayList=(data)=>{
    return axiosClient.post(`/me/play-list/song/delete`,data)
}

export const upload=(data)=>{
    return axiosClient.post('/me/upload',data)
}

export const getMySong=()=>{
    return axiosClient.get('/me/my-song')
}

export const follow=(data)=>{
    return axiosClient.get(`/me/follow/${data}`)
}

export const isFollow=(data)=>{
    return axiosClient.get(`/me/check-follow/${data}`)
}

export const unFollow=(data)=>{
    return axiosClient.get(`/me/un-follow/${data}`)
}

export const editStory=(data)=>{
    return axiosClient.post(`/me/story`,data)
}