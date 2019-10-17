'use strict'

import { Record } from 'immutable'

var InitialState = Record({
    tymLineList: [],
    showModalView: false,
    tymLineTextView: '',
    tymLineLoader: false
})

export default InitialState 