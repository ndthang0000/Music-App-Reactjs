export const nextSong=(data=null)=>{
    return {
        type:'NEXT_SONG',
        payload:data
    }
}

export const preSong=(data=null)=>{
    return {
        type:'PRE_SONG',
        payload:data
    }
}

export const playAndPauseSong=(data=null)=>{
    return {
        type:'PLAY&PAUSE_SONG',
        payload:data
    }
}

export const playAnySong=(data=null)=>{
    return {
        type:'CHANGE_ANY_SONG',
        payload:data
    }
}
