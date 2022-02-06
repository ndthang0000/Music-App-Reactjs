let setting=JSON.parse(localStorage.getItem('setting'))
if(!setting){
    setting={
        keyboard:false
    }
    localStorage.setItem('setting',JSON.stringify(setting))
}
const initState={
    music:[], // play List
    active:0, // index of play List
    currentSong:null, // current Song
    isKeyboard:setting.keyboard
}
const playMusic=(state=initState,action)=>{
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
        case 'SET_LIST_SONG': // top 100 song popular
            return {
                ...state,
                music:action.payload.playList,
                active:action.payload.index||0,
                currentSong:action.payload.playList[action.payload.index]||action.payload.playList[0]
            }
        case 'RANDOM_SONG':
            let random=Math.floor(Math.random() * state.music.length);
            while(random===state.active){
                random=Math.floor(Math.random() * state.music.length);
            }
            return {
                ...state,
                active:random,
            }
        case 'APPEND_SONG':
            let newMusic=[...state.music]
            newMusic.push(action.payload)
            return {
                ...state,
                music:newMusic
            }
        case 'SET_KEYBOARD':
            return {
                ...state,
                isKeyboard:action.payload
            }
        default:
            return state
    }
}

export default playMusic