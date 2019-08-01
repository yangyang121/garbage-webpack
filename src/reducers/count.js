import * as actionTypes from "../actions/count"

const initialState = {
  count: 0
}

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_COUNT:
    case actionTypes.REDUCE_COUNT:
      return {
        ...state,
        count: action.payload.count
      }
    default:
      return state
  }
}
