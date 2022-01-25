import music from '../music'

const initState={
    music,
    active:0,
    currentSong:music[0]
}

const rootReducer=(state=initState,action)=>{
    switch(action.type){
        case 'NEXT_SONG':
            return {
                ...state,
                active: state.active===state.music.length-1?0:state.active+1,
            }
        case 'PRE_SONG':
            return {
                ...state,
                active:state.active===0?state.music.length-1:state.active-1,
            }
        case 'CHANGE_ANY_SONG':
            if(parseInt(action.payload)>=state.music.length)
                return state
            return {
                ...state,
                active:parseInt(action.payload),
            }
        default:
            return state
    }
}

export default rootReducer