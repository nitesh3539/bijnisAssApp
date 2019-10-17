'use strict'

import InitialState from './ProfileViewInitialState'
const initialState = new InitialState()
import { 
    SET_TYMLINE_TEXT, 
    SET_MODAL_VIEW, 
    ON_CANCEL_PRESS, 
    ON_POST_PRESS, 
    SET_LOADER_FOR_TYMLINE,
    SET_TYME_LINE_LIST
 } from '../../lib/Constants'

export default function profileViewReducers(state = initialState, action) {
    switch (action.type) {

        case SET_TYME_LINE_LIST: 
            return state.set('tymLineList', action.payload)
                        .set('tymLineLoader', false)

        case ON_POST_PRESS:
            return state.set('tymLineList', action.payload)
                        .set('tymLineTextView', '')
                        .set('showModalView', false)
                        .set('tymLineLoader', false)

        case SET_MODAL_VIEW:
           return state.set('showModalView', action.payload)

        case SET_TYMLINE_TEXT:
           return state.set('tymLineTextView', action.payload)

        case SET_LOADER_FOR_TYMLINE:
           return state.set('tymLineLoader', action.payload)
           
        case ON_CANCEL_PRESS:
           return state.set('tymLineTextView', '')
                       .set('showModalView', false)

    }
    return state
}