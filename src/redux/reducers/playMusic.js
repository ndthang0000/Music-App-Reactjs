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
    isKeyboard:setting.keyboard,
}
const playMusic=(state=initState,action)=>{
    let playMusic=JSON.parse(localStorage.getItem('playMusic'))
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
            let temp=action.payload.playList.map(item=>item._id)
            playMusic.playList=temp
            localStorage.setItem('playMusic',JSON.stringify(playMusic))
            return {
                ...state,
                music:action.payload.playList,
                active:action.payload.index||0,
                currentSong:action.payload.playList[action.payload.index]||action.payload.playList[0],
            }
        case 'PLAY_PLAYLIST':
            return{
                ...state,
                music:action.payload.playList,
                active:action.payload.index||0,
                currentSong:action.payload.playList[action.payload.index]||action.payload.playList[0],
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
            let currentMusic=action.payload
            let newMusic=state.music
            for(let i=0;i<newMusic.length;i++){
                if(newMusic[i]._id===currentMusic._id){
                    return {
                        ...state,
                        active:i,
                        currentSong:newMusic[i]
                    }
                }
            }
            newMusic.splice(state.active+1,0,currentMusic)
            playMusic.playList=newMusic.map(item=>item._id)
            localStorage.setItem('playMusic',JSON.stringify(playMusic))
            return {
                ...state,
                music:newMusic,
                active:state.active+1
            }
        case 'DELETE_SONG_MUSIC':
            if(state.music.length===1){
                return state
            }
            let indexActive=state.active
            for(let i=0;i<state.music.length;i++){
                if(state.music[i]._id===action.payload){
                    if(i===0&&state.active===0){
                        indexActive=0
                    }
                    else if(i<=state.active){
                        indexActive-=1
                    }
                    state.music.splice(i,1)
                }
            }
            playMusic.playList=state.music.map(item=>item._id)
            playMusic.currentMusic=indexActive
            localStorage.setItem('playMusic',JSON.stringify(playMusic))
            return {
                ...state,
                music:[...state.music],
                active:indexActive
            }
        case 'ADD_READY_NEXT_SONG':
            for(let i=0;i<state.music.length;i++){
                if(state.music[i]._id===action.payload._id){
                    let newSongTest=state.music[i]
                    if(i===state.active){
                        return state
                    }
                    if(i<state.active){
                        state.music.splice(i,1)
                        state.music.splice(state.active,0,newSongTest)
                        playMusic.playList=state.music.map(item=>item._id)
                        localStorage.setItem('playMusic',JSON.stringify(playMusic))
                        return {
                            ...state,
                            music:[...state.music],
                            active:state.active-1
                        }
                    }
                    state.music.splice(i,1)
                    state.music.splice(state.active+1,0,newSongTest)
                    playMusic.playList=state.music.map(item=>item._id)
                    localStorage.setItem('playMusic',JSON.stringify(playMusic))
                    return {
                        ...state,
                        music:[...state.music]
                    }
                }
            }
            state.music.splice(state.active+1,0,action.payload)
            playMusic.playList=state.music.map(item=>item._id)
            localStorage.setItem('playMusic',JSON.stringify(playMusic))
            return {
                ...state,
                music:[...state.music]
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