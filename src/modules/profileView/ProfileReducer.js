'use strict'

import InitialState from './ProfileInitialState'
const initialState = new InitialState()
import { SET_PROFILE_ERROR_MESSAGE, SET_LOADER_FOR_PROFILE, SET_PROILE_LIST, RESET_STATE_FOR_PROFILE } from '../../lib/Constants'


export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        
        case SET_PROFILE_ERROR_MESSAGE:
            return state.set('errorMessage', action.payload)
                        .set('profileLoader', false)

        case SET_LOADER_FOR_PROFILE:
            return state.set('profileLoader', action.payload)

        case SET_PROILE_LIST:
        return state.set('errorMessage', '')
                    .set('pokemonList', action.payload)
                    .set('profileLoader', false)

        case RESET_STATE_FOR_PROFILE:
             return initialState
    }
    return state
}