"use strict";

import { Record } from "immutable";

var InitialState = Record({
  errorMessage: '',
  loginLoader: false,
  username: '',
  password: ''
});

export default InitialState;