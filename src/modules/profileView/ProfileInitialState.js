"use strict";

import { Record } from "immutable";

var InitialState = Record({
  errorMessage: '',
  profileLoader: false,
  pokemonList: []
});

export default InitialState;