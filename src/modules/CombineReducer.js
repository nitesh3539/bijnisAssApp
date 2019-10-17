'use strict'
import { combineReducers } from 'redux'

import profileViewReducers from './profileView/ProfileViewReducer'
import ProfileDetailsReducer from './profileDetails/ProfileDetailsReducer'
import loginReducer from './loginForm/LoginReducer'

const rootReducer = combineReducers({
    profileViewReducers,
    ProfileDetailsReducer,
    loginReducer
})
export default rootReducer