
const initState={
    user:null,
    isAuthing:true,
    playList:[]
}

const user=(state=initState,action)=>{
    console.log(action)
    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                user:action.payload.user,
                isAuthing:false,
                playList:action.payload.playList
            }
        case 'SET_PLAYLIST':
            return {
                ...state,
                playList:action.payload
            }
        default:
            return state
    }
}

export default user