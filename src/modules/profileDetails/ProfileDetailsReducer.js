'use strict'

import InitialState from './ProfileDetailsInitialState'
const initialState = new InitialState()
import { SET_PROFILE_DETAILS_LIST, SET_LOADER_FOR_PROFILE_VIEW, SET_PROFILE_DETAILS_MODAL } from '../../lib/Constants'


export default function profileDetailsReducer(state = initialState, action) {
    switch (action.type) {

        case SET_PROFILE_DETAILS_LIST:
            return state.set('profilePostList', action.payload)
                        .set('loader', false)
                        .set('showDetailsModalView', false)

        case SET_PROFILE_DETAILS_MODAL:
            return state.set('showDetailsModalView', action.payload)
                        .set('loader', false)       

        case SET_LOADER_FOR_PROFILE_VIEW:
            return state.set('loader', action.payload)
            
    }
    return state
}

