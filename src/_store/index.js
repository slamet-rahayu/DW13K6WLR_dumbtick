import { createStore, combineReducers, applyMiddleware } from "redux";

import  user from "../_reducers/usereducer";
import  events from "../_reducers/eventsreducer";
import  category from "../_reducers/categoryreducer";
import  categorypg from "../_reducers/categoryreducer";

import { logger } from '../middleware';

import thunkMiddleware from 'redux-thunk';

//Get All reducers available
//Global State come from here
const reducers = combineReducers({
  user,
  events,
  category,
  categorypg,
});

//Setup Store Redux
const store = createStore(reducers, applyMiddleware(logger, thunkMiddleware));

export default store;