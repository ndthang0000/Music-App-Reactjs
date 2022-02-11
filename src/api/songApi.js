import axiosClient from "./axios"


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
    return axiosClient.get(`/song/love/${data.idSong}`)
}

export const setLove=(data)=>{
    return axiosClient.get(`/song/set-love/${data.idSong}`)
}

export const getRecentlyListSong=(data)=>{
    return axiosClient.post(`/song/recently`,data)
}

export const getNation=()=>{
    return axiosClient.get(`/song/nation`)
}