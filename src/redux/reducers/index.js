import {combineReducers} from 'redux'
import user from './user'
import playMusic from './playMusic'

export default combineReducers({
    user,
    playMusic,
})