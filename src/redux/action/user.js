export const setUser=(data=null)=>{
    return {
        type:'SET_USER',
        payload:data
    }
}

export const setPlaylistAction=(data=null)=>{
    return {
        type:'SET_PLAYLIST',
        payload:data
    }
}
