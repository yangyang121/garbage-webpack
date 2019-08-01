import { combineReducers } from "redux"
import countReducer from "./count"
import listReducer from './list'

export default combineReducers({
  countReducer,
  listReducer
})
