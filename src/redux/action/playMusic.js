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

export const setList=(data=null)=>{
    return {
        type:'SET_LIST_SONG',
        payload:data
    }
}

export const playPlayList=(data=null)=>{
    return {
        type:'PLAY_PLAYLIST',
        payload:data
    }
}

export const appendSongInList=(data=null)=>{
    return {
        type:'APPEND_SONG',
        payload:data
    }
}

export const randomSong=(data=null)=>{
    return {
        type:'RANDOM_SONG',
        payload:data
    }
}

export const deleteSongMusic=(data=null)=>{
    return {
        type:'DELETE_SONG_MUSIC',
        payload:data
    }
}

export const addReadyNextSong=(data=null)=>{
    return {
        type:'ADD_READY_NEXT_SONG',
        payload:data
    }
}

export const setKeyboard=(data=null)=>{
    return {
        type:'SET_KEYBOARD',
        payload:data
    }
}
