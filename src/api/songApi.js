import axiosClient from "./axios"

export const upload=(data)=>{
    return axiosClient.post('/song/upload',data)
}

export const getListSong=()=>{
    return axiosClient.get('/song/get-list')
}


export const getPlayListSong=(id)=>{
    return axiosClient.get(`/song/play-list/${id}`)
}

export const getSongById=(id)=>{
    return axiosClient.get(`/song/${id}`)
}

export const getIsLove=(data)=>{
    return axiosClient.post(`/song/love`,data)
}

export const setLove=(data)=>{
    return axiosClient.post(`/song/set-love`,data)
}