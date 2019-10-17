'use strict'
import { combineReducers } from 'redux'
import loginReducer from './loginForm/LoginReducer'

const rootReducer = combineReducers({
    loginReducer
})
export default rootReducer