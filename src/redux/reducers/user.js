
const initState={
    user:null,
    isAuthing:true,
}

const user=(state=initState,action)=>{
    switch(action.type){
        case 'SET_USER':
            return {
                user:action.payload,
                isAuthing:false
            }
        default:
            return state
    }
}

export default user