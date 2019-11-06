import { combineReducers } from "redux"
import countReducer from "./count"
import listReducer from './list'
import reduxComponentReducer from '../components/reduxComponent/reducer'

export default combineReducers({
  countReducer,
  listReducer,
  reduxComponentReducer
})
