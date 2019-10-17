'use strict'

import InitialState from './LoginInitialState'
const initialState = new InitialState()
import { SET_LOADER_FOR_LOGIN, SET_LOGIN_USERNAME, SET_LOGIN_ERROR_MESSAGE, SET_LOGIN_PASSWORD, RESET_STATE_FOR_LOGIN } from '../../lib/Constants'


export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        
        case SET_LOGIN_ERROR_MESSAGE:
            return state.set('errorMessage', action.payload)
                        .set('loginLoader', false)

        case SET_LOADER_FOR_LOGIN:
            return state.set('loginLoader', action.payload)

        case SET_LOGIN_USERNAME:
        return state.set('errorMessage', '')
                    .set('username', action.payload)

        case SET_LOGIN_PASSWORD:
        return state.set('errorMessage', '')
                    .set('password', action.payload)

        case RESET_STATE_FOR_LOGIN:
             return initialState
    }
    return state
}