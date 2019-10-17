'use strict'
import { combineReducers } from 'redux'
import loginReducer from './loginForm/LoginReducer'
import profileReducer from './profileView/ProfileReducer'

const rootReducer = combineReducers({
    loginReducer,
    profileReducer
})
export default rootReducer