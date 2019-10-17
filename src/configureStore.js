/**
 * # configureStore.js
 *
 * A Redux boilerplate setup
 *
 */
"use strict";
import { createStore, applyMiddleware } from "redux"; //createStore to be removed
import thunk from 'redux-thunk'

import reducer from "./modules/CombineReducer";

export default function configureStore(intialState) {
  return createStore(reducer, intialState, applyMiddleware(thunk)); //Redux logger not required But still working here
}
