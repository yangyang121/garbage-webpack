import * as actionTypes from "./action"

const initialState = {
  count: 0
}

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_TWO:
    case actionTypes.REDUCE_TWO:
      return {
        ...state,
        count: action.payload.count
      }
    default:
      return state
  }
}
