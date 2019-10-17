"use strict";

import { Record } from "immutable";

var InitialState = Record({
  profilePostList : [],
  showDetailsModalView: false,
  loader: false
});

export default InitialState;
