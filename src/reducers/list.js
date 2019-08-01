import * as actionTypes from "../actions/list"

const initialState = {
  list: [],
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_LIST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.GET_LIST_SUCC:
      return {
        ...state,
        list: action.payload,
        loading: false
      }
    case actionTypes.GET_LIST_FAIL:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}
