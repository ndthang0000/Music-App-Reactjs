import axiosClient from "./axios"
import qs from 'qs'

export const getListSong=(number)=>{
    return axiosClient.get('/song/get-list',{
        params:{
            page:number
        },
        paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        },
    })
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