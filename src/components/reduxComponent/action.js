export const ADD_TWO = "ADD_TWO"
export const REDUCE_TWO = "REDUCE_TWO"

export const addCount = payload => ({
  type: ADD_TWO,
  payload
})

export const reduceCount = payload => ({
  type: REDUCE_TWO,
  payload
})
